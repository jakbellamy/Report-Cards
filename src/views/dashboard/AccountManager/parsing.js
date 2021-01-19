import _ from 'lodash';
const data = require('./data.json')

const print = (x) => console.log(x)

const accounts = Array.from(new Set(data.map(rec => rec['Account'])))

const filterForYear = (data, year) => {
  return _.filter(data, { 'Year': year });
}

const find_ly = (data) => {
  let ytd_date = data[data.length - 1]['Date'].split(' ')
  ytd_date[1] = (Number(ytd_date[1]) - 1).toString()

  let ly_date = ytd_date.join(' ')
  let ly = _.find(data, {'Date': ly_date})

  return ly
}

const filterForAccount = (data, account) => {
  return _.filter(data, { 'Account': account });
}

export { accounts, data, filterForYear, find_ly, filterForAccount };

