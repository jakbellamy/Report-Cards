import os
import dataset
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from matplotlib import pyplot, dates
import statsmodels.api as sm
import seaborn as sns
from supreme_data.pandas_methods import apply_to_multiple_columns
from supreme_data.pandas_methods import safe_divide

load_dotenv()

pg_url = os.getenv('PG_URL')
gs_id = os.getenv('GS_ID')

pd.set_option('mode.chained_assignment', None)
# pd.set_option('figure.max_open_warning', None)

sns.set_style("white")

########################################################################################################################
#                                                   Index                                                              #
########################################################################################################################

"""
    Step 1:     Fetch Databases Tables and convert to Pandas DataFrame Objects.
    Step 2:     Coerce Column dTypes to avoid errors.
    Step 3:     Filter Tables and coerce naming convention.
    Step 4:     Update Tables via Merges, Data Pulls or Other Munging.
    Step 4:     Data Correction, Normalization.
    Step 5.     Perform DataFrame Calculations.
    Step 6.     Create JSON File for Dash/Report Card.
    Step 7.     Plot Graphs and Each as 300dpi PNGs in Public Folder for Report Card Retrieval.
"""

########################################################################################################################
########################################################################################################################
#                                                   Methods                                                            #
########################################################################################################################

def search(dataframe, column, like_value):
    """
    Takes :: a Data Frame, Column and a substring.
    Returns :: Data Frame filtered for substring in column value.
    """
    mask = dataframe[column].apply(lambda x: str(like_value).lower() in str(x).lower())
    return dataframe[mask]

########################################################################################################################
########################################################################################################################
#                                                Script Start                                                          #
########################################################################################################################



                            ####################################################
                            #                    STEP 1.                       #
                            ####################################################



print('Fetching Database.')

database = dataset.connect(pg_url)
table_to_frame = lambda table: pd.DataFrame(list(database[table].find())).drop_duplicates()

asa_accounts = table_to_frame('account')
asa_contracts = table_to_frame('asa_contracts')
asa_lites = table_to_frame('asa_lites')
lite_contracts = table_to_frame('lite_contracts')
asa_production = table_to_frame('asa_production')
lite_production = table_to_frame('referrals')
ce_events = table_to_frame('continuing_education')

print('Database Fetched.')

                            ####################################################
                            #                    STEP 2.                       #
                            ####################################################


print('Normalizing Data.')

            ######################
            #    Date Coercion   #

table_dates = [
    (asa_accounts, ['Date', 'Start Date', 'Renewal']),
    (asa_lites, ['Origin Date', 'Termination Date']),
    (lite_contracts, ['Effective Date', 'End Date']),
    (asa_contracts, ['Effective Date', 'End Date']),
    (lite_production, ['Funded Month']),
    (asa_production, ['date'])
]

column_as_date = lambda x: pd.to_datetime(x, errors='coerce')

for table, columns in table_dates:
    apply_to_multiple_columns(table, columns, operation=column_as_date)


            #########################
            #    Numeric Coercion   #

asa_production_pedigree = ['date', 'Account', 'Date Started', 'Agent Count']
asa_production_numeric = [i for i in list(asa_production.columns) if not i in asa_production_pedigree]

table_numbers = [
    (asa_production, asa_production_numeric),
    (asa_contracts, ['Lead Cost', 'Lease Cost']),
    (lite_contracts, ['Lead Cost', 'Lease Cost'])
]

columns_as_numeric = lambda x: pd.to_numeric(x, errors='coerce')

for table, columns in table_numbers:
    apply_to_multiple_columns(table, columns, operation=columns_as_numeric)



                            ####################################################
                            #                    STEP 3.                       #
                            ####################################################



            ########################
            #    Table Filtering   #

asa_accounts = asa_accounts.loc[asa_accounts['Active']]

asa_pedigree = ['Name', 'Start Date', 'Termination Date', 'Renewal', 'Agent Count','Loan Officer Count', 'Count of Other Lenders']
asa_accounts = asa_accounts[asa_pedigree]

asa_production.rename(columns={'date': 'Date', 'Agents': 'Agent Count'}, inplace=True)

asa_lites['ASA'] = asa_lites['ASA'].apply(lambda x: x if x else None)



                            ####################################################
                            #                    STEP 4.                       #
                            ####################################################




            ############################
            #    Update Agent Counts   #

print('Updating Agent Counts.')

updated_agent_counts = asa_production.dropna(subset=['Agent Count'])

null_agent_mask = updated_agent_counts['Agent Count'] >= 1
updated_agent_counts = updated_agent_counts.loc[null_agent_mask][['Date', 'Account', 'Agent Count']]

for account, df in updated_agent_counts.groupby('Account'):
    asa_accounts.set_index('Name').loc[account, 'Agent Count'] = df['Date'].max()


            ###############################
            #    Join CE and ASA Tables   #

print('Adding CE Events')

ce_events = ce_events.loc[ce_events['Date'] > pd.to_datetime('2019-12-31')]
get_ce_count = lambda x: len(ce_events.groupby('Account').get_group(x)) if x in set(ce_events['Account']) else 0
asa_accounts['2020 CE Count'] = asa_accounts['Name'].apply(lambda x: get_ce_count(x))


            #####################################
            #    Remove Production after Term   #

print('Removing Production Data Attributed to Terminated Accounts.')

date_ceiling = lambda df_column, date: df_column <= pd.to_datetime(date)

def last_asa_production(asa):
    return max(list(asa_production.set_index('Account').loc[asa]['Date']))

detailed_lite_production = asa_lites.set_index('ASA Lite').join(lite_production.set_index('Referral Source'))
detailed_lite_production = detailed_lite_production.dropna(subset=['ASA']).reset_index().rename(columns={'index': 'Account'})

production_after_termination = np.where(detailed_lite_production['Termination Date'],
                            detailed_lite_production['Termination Date'] < detailed_lite_production['Funded Month'],
                            False)

out_of_bounds_production = list(detailed_lite_production.loc[production_after_termination].index)

detailed_lite_production.drop(out_of_bounds_production, inplace=True)


            #####################################################
            #    Join ASA Lite Production with ASA Production   #

print('Compiling ASA Lite Data Associated With Each ASA')

lite_production_by_asa = detailed_lite_production.groupby(['ASA', 'Funded Month']).agg('sum')[['Units', 'Total Loan Amount']]
lite_production_by_asa = lite_production_by_asa.reset_index().rename(columns={
                                                                        'Units': 'Lite Units',
                                                                        'Total Loan Amount': 'Lite Volume',
                                                                        'ASA': 'Account',
                                                                        'Funded Month': 'Date'
                                                                    })

asa_production_with_lites = pd.merge(asa_production, lite_production_by_asa, on=['Account', 'Date'], how='left').fillna(0)
asa_production_with_lites = asa_production_with_lites.drop(columns=['Date Started', 'Agent Count'])

df = asa_production_with_lites.sort_values(by=['Account', 'Date'])



                            ####################################################
                            #                    STEP 5.                       #
                            ####################################################



            #######################################################
            #    Aggregate Production into Monthly Company Sums   #

print('Calculating Monthly Company Totals.')

df = df[df['Account'] != 'Monthly Totals']
df = df[df['Account'] != 'YTD Totals']

totals = df.groupby('Date').agg('sum').reset_index()
totals['Account'] = 'Company Totals'

df = pd.concat([df, totals], axis=0, ignore_index=True)


            ################################
            #    Get Cumulative YTD Sums   #

print('Performing YTD Cumulative Sum Calculations.')

df['Year'] = df['Date'].apply(lambda x: x.year)

def cum_ytd(col):
    df['YTD ' + col] = df.groupby(['Account', 'Year'])[col].cumsum()

cum_ytd_cols = ['Supreme Volume', 'Office Volume', 'Supreme Units', 'Office Units', 'Lite Volume', 'Lite Units']

for col in cum_ytd_cols:
    cum_ytd(col)

            ###############################
            #    Calculate Market Share   #

print('Ensuring Market Shares are Correctly Calculated.')

df['Market Share Volume'] = safe_divide(df, ['Supreme Volume', 'Office Volume'])
df['YTD Market Share Volume'] = safe_divide(df, ['YTD Supreme Volume', 'YTD Office Volume'])
df['Market Share Units'] = safe_divide(df, ['Supreme Units', 'Office Units'])
df['YTD Market Share Units'] = safe_divide(df, ['YTD Supreme Units', 'YTD Office Units'])
df['Lite Share Volume'] = safe_divide(df, ['Lite Volume', 'Supreme Volume'])
df['YTD Lite Share Volume'] = safe_divide(df, ['YTD Lite Volume', 'YTD Supreme Volume'])
df['Lite Share Units'] = safe_divide(df, ['Lite Units', 'Supreme Units'])
df['YTD Lite Share Units'] = safe_divide(df, ['YTD Lite Units', 'YTD Supreme Units'])
df = df.fillna(0)



                            ####################################################
                            #                    STEP 6.                       #
                            ####################################################



print('Saving Compiled Data to JSON File.')

            #################################
            #    Convert Dates to Strings   #

df['Date Time'] = df['Date']
df['Date'] = df['Date'].apply(lambda x: x.strftime('%B %Y'))

null_date_mask = lambda x: asa_accounts[x].apply(lambda x: not pd.isnull(x))

asa_date_formatter = lambda x: np.where(pd.isnull(x), '', x)

asa_accounts['Renewal'] = asa_accounts['Renewal'].fillna('')
asa_accounts['Renewal'] = asa_accounts['Renewal'].apply(lambda x: x if isinstance(x, str) else x.strftime('%B %d, %Y'))

asa_accounts['Termination Date'] = asa_accounts['Termination Date'].fillna('')
asa_accounts['Termination Date'] = asa_accounts['Termination Date'].apply(lambda x: x if isinstance(x, str) else x.strftime('%B %d, %Y'))

asa_accounts['Start Date'] = asa_accounts['Start Date'].fillna('')
asa_accounts['Start Date'] = asa_accounts['Start Date'].apply(lambda x: x if isinstance(x, str) else x.strftime('%B %d, %Y'))


            ########################################################
            #    Save DataFrame as JSON to Report Card Directory   #

monthly_data = pd.merge(df, asa_accounts, left_on=['Account'], right_on=['Name'], how='left').fillna(0).drop(columns=['Name'])
name_key = {
    'KW - Brandon': 'KW - Suburban Tampa',
    'KW - Kannapolis': 'KW - Premier',
    'KW - Athens': 'KW - Greater Athens'
}
apply_name_key = lambda account: name_key[account] if account in list(name_key.keys()) else account
monthly_data['Account'] = monthly_data['Account'].apply(apply_name_key)
monthly_data.to_json('../data/data.json', orient='records')

print('JSON File Successfully Saved.')
