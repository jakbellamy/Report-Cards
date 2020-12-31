import { createRequire } from 'module'
import _ from 'lodash'

const require = createRequire(import.meta.url)
const data = require('./data.json')

const print = (x) => console.log(x)

const accounts = Array.from(new Set(data.map(rec => rec['Account'])))
const rand_account = _.sample(accounts)

const filterForAccount = (data, account) => {
  return _.filter(data, { 'Account': account });
}

const account_data = filterForAccount(data, rand_account)
const test_record = account_data[account_data.length - 1]

// ############################## //

const as_dollars = (cost) => {
  return cost.toLocaleString(
    'en-US', { style: 'currency', currency: 'USD' }).split('.')[0]
}

print(as_dollars(test_record['ASA Leads Cost']))
