import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';

import { useStyles } from './styles'

let today = new Date()

export default function ReportCardHeader(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        <div style={{paddingTop: 20}}>
          <Typography variant="h1">{props.accountData[0] ? props.accountData[0]['Account'] : ''}</Typography>
          <Typography variant="subtitle1">{props.accountData[0] ? `Date: ${today.toLocaleDateString()}` : ''}</Typography>
        </div>
      </Grid>

      <Grid item xs={5}>
        <center><img src={'https://supremebest.com/wp-content/uploads/2020/02/supreme_logo.svg'} width={'80%'} /></center>
      </Grid>
    </Grid>
  );
}
