import { createRequire } from 'module'
import _ from 'lodash'

const require = createRequire(import.meta.url)
const data = require('./data.json')

const print = (x) => console.log(x)

const accounts = Array.from(new Set(data.map(rec => rec['Account'])))
const rand_account = _.sample(accounts)

const handleSelection = (account) => {
  return _.filter(data, { 'Account': account });
}

const rand_account_data = handleSelection(rand_account)

// print(data)
print(rand_account_data)
