import React from 'react';
import { DataBox } from '../../Modules/DataBox/DataBox';
import { asUSD } from '../../../functions/methods';
import { compData } from '../../../index';
import Grid from '@material-ui/core/Grid';

export default function OfficeVolume(props) {
  const { thisMonth, comparableMonth, periodCaption } = props

  let differenceValue
  if (periodCaption && comparableMonth) {
    differenceValue = compData('YTD Office Volume', thisMonth, comparableMonth)
      .toFixed(2)
      .toString() + '%'
    if (!differenceValue.includes('-')){
      differenceValue = '+' + differenceValue
    }
  } else {
    differenceValue = ''
  }

  return (
    <Grid item xs={6}>
      <DataBox
        title="Office Volume"
        value={thisMonth['YTD Office Volume'] ?
          asUSD(thisMonth['YTD Office Volume']) : ''
        }
        differenceValue={differenceValue}
        caption={periodCaption}
      />
    </Grid>
  );
}
