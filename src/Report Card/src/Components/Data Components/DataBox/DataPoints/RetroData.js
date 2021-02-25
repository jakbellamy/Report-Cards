import React from 'react';
import { Grid } from '@material-ui/core';
import { DataBox } from '../DataBox';
import { valueKeyText, calculatePercentChange, printPercent, formatPercentAsString } from '../../DataFunctions';

export default function MShareVolume(props) {
  const { year1, year2 } = props;


  return (
    <Grid item xs={6}>
      <DataBox
        title={'Market Share'}
        valueYTD={valueYTD}
        valueComp={valueComp}
        differenceValue={percentChangeStr}
        captions={captions}
      />
    </Grid>
  );
}
