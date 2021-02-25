import React from 'react';
import { DataBox } from '../DataBox';
import { asUSD } from '../../../../../functions/dataDisplayers';
import { calculatePercentChange } from '../../../../../functions/dataMethods';
import Grid from '@material-ui/core/Grid';

export default function OfficeVolume(props) {
  const { thisMonth, comparableMonth, period } = props;

  let differenceValue;
  let captions = ['', ''];
  let valueKey = period === 'YOY' ? 'YTD Office Volume' : 'Office Volume';

  if (comparableMonth) {
    captions = [thisMonth['Date'], comparableMonth['Date']];
    differenceValue = (
      calculatePercentChange(valueKey, thisMonth, comparableMonth) * 100)
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
        title={'Office Volume'}
        valueYTD={thisMonth[valueKey] ?
          asUSD(thisMonth[valueKey]) : ''
        }
        valueComp={comparableMonth[valueKey] ?
          asUSD(comparableMonth[valueKey]) : ''
        }
        differenceValue={differenceValue}
        captions={captions}
        period={'Year-to-Date'}
      />
    </Grid>
  );
}
