import { printPercent } from '../../../functions/dataDisplayers';

const determineProgressMeterColor = (progressWidth) => {
  if(progressWidth >= 90) {
    return 'green'
  }else if(90 > progressWidth <= 70) {
    return 'yellow'
  }else {
    return 'red'
  }
}

export {
  printPercent,
  determineProgressMeterColor
}
