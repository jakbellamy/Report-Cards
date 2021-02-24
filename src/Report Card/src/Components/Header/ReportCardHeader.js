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
  const { data } = props
  const classes = useStyles();

  let accountHeader = data ? data['Account'] : ''
  let renewal = data ? data['Renewal'] : ''
  return (

        <div className={classes.div}>
          <Typography className={classes.accountHeader} >{accountHeader}</Typography>
          <Typography className={classes.date}>Contract Expiration / Goal Renewal: {renewal}</Typography>
        </div>

  );
}
