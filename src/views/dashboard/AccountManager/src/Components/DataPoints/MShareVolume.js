import React from 'react';
import { DataBox } from '../../Modules/DataBox/DataBox';
import { asUSD, pctString } from '../../../functions/methods';
import { compData } from '../../../index';
import Grid from '@material-ui/core/Grid';

export default function MShareVolume(props) {
  const { thisMonth, comparableMonth } = props

  let differenceValue
  let captions = ['', '']
  if (comparableMonth) {
    captions = [thisMonth['Date'], comparableMonth['Date']]
    differenceValue = compData('YTD Market Share Volume', thisMonth, comparableMonth)
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
        title="YTD Market Share"
        valueYTD={thisMonth['YTD Market Share Volume'] ?
          pctString(thisMonth['YTD Market Share Volume']) : ''
        }
        valueComp={comparableMonth['YTD Market Share Volume'] ?
          pctString(comparableMonth['YTD Market Share Volume']) : ''
        }
        differenceValue={differenceValue}
        captions={captions}
      />
    </Grid>
  );
}
