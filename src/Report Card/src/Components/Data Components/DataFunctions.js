import { calculatePercentChange } from '../../../functions/dataMethods'
import { printPercent } from '../../../functions/dataDisplayers';

const valueKeyText = (period) => {
  if( period === 'YOY' ){
    return 'YTD Market Share Volume'
  } else {
    return 'Market Share Volume'
  }
}

const formatPercentAsString = (percentInt) => {
  let percentStr = (
    percentInt
      .toFixed(2)
      .toString() + '%'
  )
  let intSign = percentStr.includes('-') ? '' : '+'
  return intSign + percentStr
}

// const forma

export {
  valueKeyText,
  calculatePercentChange,
  printPercent,
  formatPercentAsString
}
