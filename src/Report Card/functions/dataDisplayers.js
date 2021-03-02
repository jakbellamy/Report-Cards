
const asUSD = (cost, toPlace=0) => {
  let moneyString = cost.toLocaleString('en-US', {
                                          style: 'currency',
                                          currency: 'USD'
                                       }).split('.')
  let tail = toPlace > 0 ? '.' + moneyString[1].slice(0, toPlace) : ''
  return moneyString[0] + tail
}

const printPercent = (percent, toDecimalPlace=0) => {
  percent = (percent * 100)
              .toFixed(2 + toDecimalPlace)
              .toString()
  return percent + '%'
}

export { asUSD, printPercent }
