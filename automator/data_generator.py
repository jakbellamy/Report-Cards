import pandas as pd
import numpy as np
from dotenv import load_dotenv
import os
from datetime import datetime
from supreme_data.Database import Database
from matplotlib import pyplot, dates
import statsmodels.api as sm
import seaborn as sns
from supreme_data import pandas_methods as pm

load_dotenv('../.env')

pd.set_option('mode.chained_assignment', None)
sns.set_style("white")

db = Database(os.getenv('PG_URL'))

asa_accounts = db.fetch_table('asa_accounts')
asa_contracts = db.fetch_table('asa_contracts')
asa_lites = db.fetch_table('lite_accounts')
lite_contracts = db.fetch_table('lite_contracts')
asa_production = db.fetch_table('asa_production')
lite_production = db.fetch_table('lite_referrals')

def contracts_to_costs(contracts):
    contracts['End Date'] = contracts['End Date'].apply(lambda x: datetime.now() if pd.isnull(x) else x)
    costs = []
    for _,contract in contracts.iterrows():
        date_range = pd.date_range(start=contract['Effective Date'].replace(day=1),
                                   end=contract['End Date'].replace(day=1),
                                   freq='m')
        for month in date_range:
            cost_row = (contract['Account'],
                        month.replace(day=1),
                        contract['Lead Cost'],
                        contract['Lease Cost'])
            costs += [cost_row]

    return pd.DataFrame(data=costs,
                        columns=['Account', 'Date',
                                'Lead Cost', 'Lease Cost'])


########################################################################################################################
########################################################################################################################
#                                                Script Start                                                          #
########################################################################################################################

associated_lite_costs = (contracts_to_costs(lite_contracts)
                          .set_index('Account')
                          .join(asa_lites.set_index('Account')['Associated ASA'])
                          .rename(columns={
                              'Associated ASA': "Account",
                              "Lead Cost": 'Lite Lead Cost',
                              "Lease Cost": "Lite Lease Cost"
                          })
                          .set_index(["Account", 'Date'], drop=True))

total_asa_costs = (contracts_to_costs(asa_contracts)
                   .set_index(["Account", 'Date'])
                   .join(associated_lite_costs)
                   .fillna(0))

pedigree_columns = list(asa_accounts.set_index('Account').columns)

asa_report = (total_asa_costs
              .reset_index()
              .set_index('Account')
              .join(asa_accounts.set_index('Account'))
              .set_index(pedigree_columns, append=True)
              .reset_index()
              .set_index(['Account', 'Date'])
              .join(asa_production
                      .set_index(['Account', 'Date']))
              .set_index(pedigree_columns, append=True)
              .fillna(0)
              .apply(pd.to_numeric)
              .replace([None], 0)
              .reset_index()
              .fillna(''))


simplify_loan_purpose = lambda x: x if x == 'Purchase' else 'Non-Purchase'
lite_production['Loan Purpose'] = lite_production['Loan Purpose'].apply(simplify_loan_purpose)

paired_lite_production = (lite_production
                          .rename(columns={'Referral Source': 'Account',
                                          'Funded Month': 'Date'})
                          .set_index('Account')
                          .join(asa_lites.set_index('Account')['Associated ASA'])
                          .reset_index(drop=True)
                          .rename(columns={'Associated ASA': 'Account'})
                          .groupby(['Account', 'Date', 'Loan Purpose'])
                          .agg('sum')[['Units', 'Total Loan Amount']]
                          .reset_index())

paired_lite_production = (paired_lite_production
                          .set_index(['Account', 'Date', 'Loan Purpose'])
                          .unstack())

merged_column_levels = zip(paired_lite_production.columns.get_level_values(1),
                           paired_lite_production.columns.get_level_values(0))

join_column_levels = lambda x: 'Lites ' + ' '.join(list(x))
modified_columns = [join_column_levels(column_row) for column_row in merged_column_levels]

paired_lite_production.columns = modified_columns

df = (asa_report
      .set_index(['Account', 'Date'])
      .join(paired_lite_production)
      .reset_index()
      .sort_values(by=['Date', 'Account'])
      .fillna(0))

df = df.set_index(pedigree_columns + ['Account']).fillna(0).apply(pd.to_numeric).reset_index().fillna('')

df['Year'] = df['Date'].apply(lambda x: pd.to_datetime(x).year)

def cum_ytd(col):
    df['YTD ' + col] = df.groupby(['Account', 'Year'])[col].cumsum()

cum_ytd_cols = ['Supreme Volume', 'Office Volume', 'Supreme Units', 'Office Units']

for col in cum_ytd_cols:
    cum_ytd(col)

totals = df.groupby('Date').agg('sum').reset_index()
totals['Account'] = 'Company Totals'

df = pd.concat([df, totals], axis=0, ignore_index=True)

df['Market Share Volume'] = pm.safe_divide(df, ['Supreme Volume', 'Office Volume'])
df['Market Share Units'] = pm.safe_divide(df, ['Supreme Units', 'Office Units'])
df['Avg Supreme Loan'] = pm.safe_divide(df, ['Supreme Volume', 'Supreme Units'])
df['Avg Office Loan'] = pm.safe_divide(df, ['Office Volume', 'Office Units'])
df['YTD Market Share Volume'] = pm.safe_divide(df, ['YTD Supreme Volume', 'YTD Office Volume'])
df['YTD Market Share Units'] = pm.safe_divide(df, ['YTD Supreme Units', 'YTD Office Units'])

null_data_mask = df['Office Volume'] > 0
df = df.loc[null_data_mask]
df = df.fillna('')

df['Date Time'] = df['Date']
df['Date'] = df['Date'].apply(lambda x: pd.to_datetime(x).strftime('%B %Y'))
df['Renewal'] = df['Renewal'].apply(lambda x: x if isinstance(x, str) else pd.to_datetime(x).strftime('%B %d, %Y'))
df['Start Date'] = df['Start Date'].apply(lambda x: x if isinstance(x, str) else pd.to_datetime(x).strftime('%B %d, %Y'))

df.to_json('../src/Report Card/data/data.json', orient='records')

print('JSON File Successfully Saved.')
