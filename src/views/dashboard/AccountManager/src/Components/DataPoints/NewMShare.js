import React from 'react';
import { DataBox } from '../../Modules/DataBox/DataBox';
import { asUSD } from '../../../functions/methods';
import { compData } from '../../../index';
import Grid from '@material-ui/core/Grid';

export default function OfficeVolume(props) {
  const { thisMonth, comparableMonth, period } = props

  let differenceValue
  let captions = ['', '']
  let valueKey = period === 'YOY' ? 'YTD Office Volume' : 'Office Volume'

  if (comparableMonth) {
    captions = [thisMonth['Date'], comparableMonth['Date']]
    differenceValue = compData(valueKey, thisMonth, comparableMonth)
      .toFixed(2)
      .toString() + '%'
    if (!differenceValue.includes('-')){
      differenceValue = '+' + differenceValue
    }
  } else {
    differenceValue = ''
  }
  console.log(captions)
  return (
    <Grid item xs={6}>
      <DataBox
        title={valueKey}
        valueYTD={thisMonth[valueKey] ?
          asUSD(thisMonth[valueKey]) : ''
        }
        valueComp={comparableMonth[valueKey] ?
          asUSD(comparableMonth[valueKey]) : ''
        }
        differenceValue={differenceValue}
        captions={captions}
      />
    </Grid>
  );
}
