import React from 'react';
import { useStyles } from './styles'
import CenteredImage from '../_Modules/centeredImage';
import { supremeTitleLogoURL } from '../../../data/constants';
import { Header } from 'tabler-react';

import {
  Grid,
  Typography,
  Box
} from '@material-ui/core';

let today = new Date()


export default function ReportCardHeader(props) {
  const classes = useStyles();

  let accountHeader = props.accountData[0] ? props.accountData[0]['Account'] : ''
  let reportDate = props.accountData[0] ? `Date: ${today.toLocaleDateString()}` : ''
  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        <div style={{paddingTop: 20, marginLeft: 25, marginBottom: -15}}>
          <Header className="display-3 font-weight-bold">{accountHeader}</Header>
          {/*<Typography variant="h1">{accountHeader}</Typography>*/}
          <Header className="font-weight-normal">{reportDate}</Header>
        </div>
      </Grid>

      {/*<Grid item xs={4}>*/}
      {/*  <Box className={classes.logoBox} paddingRight={'15%'}>*/}
      {/*    <CenteredImage src={supremeTitleLogoURL} height={'70'} />*/}
      {/*  </Box>*/}
      {/*</Grid>*/}
      {/*<Grid item xs={1} />*/}
    </Grid>
  );
}
