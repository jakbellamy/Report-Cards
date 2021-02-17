
const asUSD = (cost) => {
  return cost.toLocaleString(
    'en-US', { style: 'currency', currency: 'USD' }).split('.')[0]
}

const printPercent = (percent, toDecimalPlace=0) => {
  percent = (percent * 100)
              .toFixed(2 + toDecimalPlace)
              .toString()
  return percent + '%'
}

export { asUSD, printPercent }
