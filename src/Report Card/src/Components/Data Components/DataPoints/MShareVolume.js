import React from 'react';
import { Grid } from '@material-ui/core';
import { DataBox } from '../DataBox/DataBox';
import {
  valueKeyText,
  calculatePercentChange,
  printPercent, formatPercent, formatPercentAsString
} from '../DataFunctions';

export default function MShareVolume(props) {
  const { thisMonth, comparableMonth, period } = props

  let captions = ['', '']
  let percentChangeStr = ''
  let valueKey = valueKeyText(period)

  if (comparableMonth) {
    captions = [thisMonth['Date'], comparableMonth['Date']]
    let percentChangeInt = calculatePercentChange(valueKey, thisMonth, comparableMonth)
    percentChangeStr = formatPercentAsString(percentChangeInt, 0)
  }

  let valueYTD = thisMonth[valueKey] ? printPercent(thisMonth[valueKey]) : ''
  let valueComp = comparableMonth[valueKey] ? printPercent(comparableMonth[valueKey]) : ''
  return (
    <Grid item xs={6}>
      <DataBox
        title={valueKey}
        valueYTD={valueYTD}
        valueComp={comparableMonth[valueKey] ?
          printPercent(comparableMonth[valueKey]) : ''
        }
        differenceValue={percentChangeStr}
        captions={captions}
      />
    </Grid>
  );
}
