from selenium import webdriver
from time import sleep
from selenium.webdriver.chrome.options import Options
import pandas as pd
import dataset
from dotenv import load_dotenv
import os

load_dotenv('../.env')
pg_url = os.getenv('PG_URL')

opts = Options()

opts.add_argument("--headless")
browser = webdriver.Chrome('./chromedriver', options=opts)
# browser.set_window_size(1400, 1100)


########################################################################################################################
                          ## STEPS ##
########################################################################################################################
"""
    1.      Get Accounts from Db to iterate over.
    2.      For Each Account Open Headless Chrome.
"""
########################################################################################################################
########################################################################################################################


####################################################
#                    STEP 1.                       #
####################################################

print('Fetching Database.')

database = dataset.connect(pg_url)
table_to_frame = lambda table: pd.DataFrame(list(database[table].find()))

asa_accounts = table_to_frame('account')
accounts_list = sorted(list(set(asa_accounts['Name'])))

####################################################
#                    STEP 2.                       #
####################################################

def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', printEnd = "\r"):
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    print(f'\r{prefix} |{bar}| {percent}% {suffix}', end = printEnd)
    # Print New Line on Complete
    if iteration == total:
        print()


print('Beginning Report Generation')

only_alpha = lambda x: ''.join([s for s in x if str.isalpha(s)])

accounts_list += [accounts_list[0]

printProgressBar(0, len(accounts_list), prefix='Report Cards', suffix='Generated', length=50)
for i, account in enumerate(accounts_list):
    name_key = {
        'KW - Brandon': 'KW - Suburban Tampa',
        'KW - Kannapolis': 'KW - Premier',
        'KW - Athens': 'KW - Greater Athens'
    }
    account = name_key[account] if account in list(name_key.keys()) else account

    try:
        name = account
        account = [x if not any(s for s in x if str.isnumeric(s))
                   else False for x in account.split(' ')]

        chunks = []
        for chunk in account:
            if chunk:
                chunks += chunk
            else:
                chunks = []

        account = ''.join(chunks)
        url = f'http://localhost:3000/{only_alpha(account).lower()}'
        browser.get(url)
        sleep(2.5)

        ele=browser.find_element_by_class_name('MuiContainer-root')
        total_height = ele.size["height"]

        browser.set_window_size(1650, total_height)      #the trick
        sleep(2)
        browser.save_screenshot(f"../__GeneratedReportCards__/{name}.png")
        printProgressBar(i + 1, len(accounts_list), prefix='Report Cards', suffix='Generated', length=50)
    except Exception as e:
        pass
browser.close()
