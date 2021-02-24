import React from 'react';
import { DataBox } from '../DataBox/DataBox';
import { printPercent } from '../../../../functions/dataDisplayers';
import { calculatePercentChange } from '../../../../functions/dataMethods';
import Grid from '@material-ui/core/Grid';

export default function MShareVolume(props) {
  const { thisMonth, comparableMonth, period } = props;

  let differenceValue;
  let captions = ['', ''];
  let valueKey = period === 'YOY' ? 'YTD Market Share Volume' : 'Market Share Volume';

  if (comparableMonth) {
    captions = [thisMonth['Date'], comparableMonth['Date']];
    differenceValue = calculatePercentChange(valueKey, thisMonth, comparableMonth)
      .toFixed(0)
      .toString() + '%';
    if (!differenceValue.includes('-')) {
      differenceValue = '+' + differenceValue;
    }
  } else {
    differenceValue = '';
  }
  console.log(captions);
  return (
    <Grid item xs={6}>
      <DataBox
        title={'Market Share'}
        valueYTD={thisMonth[valueKey] ?
          printPercent(thisMonth[valueKey]) : ''
        }
        valueComp={comparableMonth[valueKey] ?
          printPercent(comparableMonth[valueKey]) : ''
        }
        differenceValue={differenceValue}
        captions={captions}
      />
    </Grid>
  );
}
