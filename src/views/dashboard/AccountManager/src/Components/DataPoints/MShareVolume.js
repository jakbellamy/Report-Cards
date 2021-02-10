import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { DataBox } from '../../Modules/DataBox/DataBox';
import { pctString } from '../../../functions/methods';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function MShareVolume(props) {
  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <DataBox
        title="Market Share Volume"
        value={pctString(props.thisMonth['Market Share Volume'])}
        differenceValue="+13%"
        caption="Since last year"
      />
    </Grid>
  );
}
