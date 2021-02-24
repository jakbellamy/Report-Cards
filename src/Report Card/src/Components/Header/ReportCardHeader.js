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

        <div className={classes.div}>
          <Typography className={classes.accountHeader} >{accountHeader}</Typography>
          <Header className={classes.date}>{reportDate}</Header>
        </div>

  );
}
