import { printPercent } from '../../../functions/dataDisplayers';
import { colors } from 'tabler-react';

const determineProgressColor = (progressWidth) => {
  if(progressWidth >= 90) {
    return 'green'
  }else if(90 > progressWidth <= 70) {
    return 'yellow'
  }else {
    return 'red'
  }
}

const setDonutColor = (percentProgress) => {
  let progressColor = determineProgressColor(percentProgress) + '-light'
  return colors[progressColor]
}

export {
  printPercent,
  determineProgressColor,
  setDonutColor
}

