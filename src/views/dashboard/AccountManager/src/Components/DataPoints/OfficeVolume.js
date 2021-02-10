import React from 'react';
import { DataBox } from '../../Modules/DataBox/DataBox';
import { asUSD } from '../../../functions/methods';
import { compData } from '../../../index';
import Grid from '@material-ui/core/Grid';

export default function OfficeVolume(props) {
  const { thisMonth, comparableMonth } = props

  let differenceValue
  let captions = ['', '']
  if (comparableMonth) {
    captions = [thisMonth['Date'], comparableMonth['Date']]
    differenceValue = compData('YTD Office Volume', thisMonth, comparableMonth)
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
        title="YTD Office Volume"
        valueYTD={thisMonth['YTD Office Volume'] ?
          asUSD(thisMonth['YTD Office Volume']) : ''
        }
        valueComp={comparableMonth['YTD Office Volume'] ?
          asUSD(comparableMonth['YTD Office Volume']) : ''
        }
        differenceValue={differenceValue}
        captions={captions}
      />
    </Grid>
  );
}
