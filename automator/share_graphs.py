import dataset
import os
from sys import exit
import numpy as np
import pandas as pd
from dotenv import load_dotenv
import matplotlib.pyplot as plt
import matplotlib as mpl
import seaborn as sns
from datetime import datetime
from IPython.display import display, FileLink


load_dotenv('.env')
plt.style.use('seaborn')
plt.rcParams.update({'figure.max_open_warning': 0})

pd.set_option('display.max_rows', 15)
pd.set_option('mode.chained_assignment', None)

########################################################################################################################
#       Query Datasets
database = dataset.connect(os.getenv('PG_URL'))
table_to_frame = lambda table: pd.DataFrame(list(database[table].find()))

asa_accounts = table_to_frame('asa_accounts')
asa_production = table_to_frame('asa_production')

if len(asa_accounts) > 0 and len(asa_production) > 0:
    print('Data Loaded.')
else:
    print('Failed to Load Data.')
    exit()

########################################################################################################################
#       Set Data Variables
best_in_class_sole_lenders = ['Lake Real', 'Woodst', 'Coral', 'Park creek', 'Sugar', 'Road', 'West Cobb']
best_in_class_other_lenders = ['East Cobb', 'West Cobb']

date_floor = '2018-12-31'
date_ceiling = False

name_key = {
    'KW - Brandon': 'KW - Suburban Tampa'
}

valid_accounts = [account for account in set(asa_accounts['Account'])
                  if account in list(set(asa_production['Account']))]
########################################################################################################################
#       Define Query and Mask Methods
remove_null_months = lambda df: df[df['Office Volume'] > 0]


def date_mask(df):
    df = df[df['date'] > pd.to_datetime(date_floor)] if date_floor else df
    df = df[df['date'] < pd.to_datetime(date_ceiling)] if date_ceiling else df
    return df


def match_account(substr):
    return (asa_accounts[asa_accounts['Account']
        .apply(lambda x: target_account.lower() in x.lower())].iloc[0])


def query_account(account_name):
    account_mask = asa_production['Account'] == account_name
    df = (asa_production
          .loc[account_mask]
          .drop_duplicates(subset=['date'])
          .reset_index())

    if not len(set(df['Account'])) == 1:
        return False

    df = date_mask(df)
    return remove_null_months(df)


def query_best(account_name):
    account = asa_accounts.groupby('Account').get_group(account_name).iloc[0]
    if account['Count of Other Lenders'] > 0:
        best_in_class = best_in_class_other_lenders
    else:
        best_in_class = best_in_class_sole_lenders

    best_matches = []
    for substr in best_in_class:
        match = [account for account in list(set(asa_production['Account']))
                 if substr.lower() in account.lower()]
        if not len(match) == 1:
            return False
        best_matches += match

    best_mask = asa_production['Account'].apply(lambda x: x in best_matches)
    df = (asa_production.loc[best_mask]
          .drop_duplicates()
          .reset_index(drop=True))

    df = date_mask(df)
    return remove_null_months(df)


print('Graphing Data.')

for account_name in valid_accounts:
    #      Target Dataset
    target_dataset = query_account(account_name)
    target_dataset = (target_dataset
                      .sort_values(by=['date'])
                      .set_index('date'))
    target_dataset.index = (pd.to_datetime(target_dataset.index)
                            .to_period('Q')
                            .strftime('%F-Q%q'))
    target_dataset.drop([quarter for quarter in target_dataset.index
                         if not len(target_dataset.loc[quarter]) == 3], inplace=True)
    target_dataset = (target_dataset[['Office Volume', 'Supreme Volume']]
                      .groupby(target_dataset.index)
                      .agg('sum'))
    target_dataset['Market Share'] = pd.to_numeric(
        target_dataset['Supreme Volume'] / target_dataset['Office Volume'])

    #       Best in Class Dataset
    best_dataset = query_best(account_name)
    best_dataset = (best_dataset
                    .sort_values(by=['date'])
                    .set_index('date'))
    best_dataset.index = (pd.to_datetime(best_dataset.index)
                          .to_period('Q')
                          .strftime('%F-Q%q'))
    best_dataset.drop([quarter for quarter in best_dataset.index
                       if not quarter in target_dataset.index], inplace=True)
    best_dataset = (best_dataset[['Office Volume', 'Supreme Volume']]
                    .groupby(best_dataset.index)
                    .agg('sum'))
    best_dataset['Market Share'] = pd.to_numeric(
        best_dataset['Supreme Volume'] / best_dataset['Office Volume'])

    #       Save Dataset
    target_dataset.to_excel(f"./datasets/{datetime.now().strftime('%Y-%m-%d')} {account_name}.xlsx")
    best_dataset.to_excel(f"./best_datasets/Best Comparison for {account_name}.xlsx")

    #       Plot Chart
    fig = plt.figure()

    font = {'size': 22}

    plt.rc('font', **font)
    plt.rc('')

    @plt.FuncFormatter
    def as_percent(y, pos):
        return str(round(y * 100)) + '%'

    account_name = name_key[account_name] if account_name in list(name_key.keys()) else account_name

    plt.fill_between(target_dataset.index, target_dataset['Market Share'],
                     alpha=0.55, label=account_name)
    plt.fill_between(best_dataset.index, best_dataset['Market Share'],
                     alpha=0.35, label='Best in Class')
    ax = plt.gca()
    ax.yaxis.set_major_formatter(as_percent)

    ax.set_title(f'Supreme Market Share in {account_name}', fontweight='bold', pad=10)
    ax.set_xlabel('Quarter')
    ax.set_ylabel('Supreme Market Share')
    ax.legend(loc=2, prop={'size': 12})

    filename = f"./plots/{datetime.now().strftime('%Y-%m-%d')} {account_name}.png"
    fig.set_size_inches(11.5, 8.5)
    plt.savefig(filename, dpi=300,
                facecolor='w', edgecolor='w')

print('Complete')
