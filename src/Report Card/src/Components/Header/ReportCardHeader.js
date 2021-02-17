import React from 'react';
import { useStyles } from './styles'
import CenteredImage from '../_Modules/centeredImage';
import { supremeTitleLogoURL } from '../../../data/constants';

import {
  Grid,
  Typography,
  Box
} from '@material-ui/core';

let today = new Date()

export default function ReportCardHeader(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        <div style={{paddingTop: 20}}>
          <Typography variant="h1">{props.accountData[0] ? props.accountData[0]['Account'] : ''}</Typography>
          <Typography variant="caption">{props.accountData[0] ? `Date: ${today.toLocaleDateString()}` : ''}</Typography>
        </div>
      </Grid>

      <Grid item xs={4}>
        <Box className={classes.logoBox}>
          <CenteredImage src={supremeTitleLogoURL} height={'70'} />
        </Box>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
