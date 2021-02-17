import { printPercent } from '../../../functions/dataDisplayers';
import { colors } from 'tabler-react';

const determineProgressColor = (progressWidth) => {
  console.log(progressWidth)
  if(progressWidth >= 90) {
    return 'green'
  }else if(progressWidth >= 70) {
    console.log('hit')
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

