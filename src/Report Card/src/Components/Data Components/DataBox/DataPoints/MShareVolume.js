import React from 'react';
import { Grid } from '@material-ui/core';
import { DataBox } from '../DataBox';
import { valueKeyText, calculatePercentChange, printPercent, formatPercentAsString } from '../../DataFunctions';

export default function MShareVolume(props) {
  const { thisMonth, comparableMonth, period } = props;

  let captions = ['', ''];
  let percentChangeStr = '';
  let valueKey = valueKeyText(period);

  if (comparableMonth) {
    captions = [thisMonth['Date'], comparableMonth['Date']];
    let percentChangeInt = calculatePercentChange(valueKey, thisMonth, comparableMonth);
    percentChangeStr = formatPercentAsString(percentChangeInt, 0);
  }

  let valueYTD = thisMonth[valueKey] ? printPercent(thisMonth[valueKey]) : '';
  let valueComp = comparableMonth[valueKey] ? printPercent(comparableMonth[valueKey]) : '';
  return (
    <Grid item xs={6}>
      <DataBox
        title={'Market Share'}
        valueYTD={valueYTD}
        valueComp={valueComp}
        differenceValue={percentChangeStr}
        captions={captions}
        period={'Year-to-Date'}
      />
    </Grid>
  );
}
