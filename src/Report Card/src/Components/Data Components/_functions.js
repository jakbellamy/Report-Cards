import { printPercent } from '../../../functions/dataDisplayers';
import { colors } from 'tabler-react';

const determineProgressColor = (progressWidth) => {
  if(progressWidth >= 85) {
    return 'green'
  }else if(85 > progressWidth <= 70) {
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

