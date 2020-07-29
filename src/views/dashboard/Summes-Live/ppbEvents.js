import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, Typography, Grid, makeStyles } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// import Chart from './Chart';
import { getHourNumbers } from '@material-ui/pickers/views/Clock/ClockNumbers';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  line: {
    padding: theme.spacing(0, 3)
  }
}));

const insertCommas = (num) => {
  if(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num
  }
}

const handleShare = (num) => {
  return Math.round(num * 100)
}
function EarningsSegmentation(props, { className, ...rest }) {
  const classes = useStyles();

  console.log('bio props', props)
  if(props.report){
    console.log('units', props.report.market_share_units)
  }
  return (
    <Card className={clsx(classes.root, className)}{...rest}>
      <CardHeader action={<GenericMoreButton />} title="Personal & Professional Best"/>
      <Divider />
      <Box p={3} position="relative" minHeight={320}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Typography variant="h5" color="textPrimary">
              Number of Participants YTD
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" color="textPrimary">
              121
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" className={classes.item}>
          Smart Trivia Stats
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              Latest Office Winner
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              Richard Kind
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              Total Office Wins
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              3
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" className={classes.item}>
          Next Month's Program
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              Date
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              12/12/20
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              Topic
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h5" color="textPrimary" className={classes.line}>
              Accountability
            </Typography>
          </Grid>
            {/*<Typography variant="h5" color="textPrimary" className={classes.line}>*/}
            {/*  Total Office Wins*/}
            {/*</Typography>*/}

        </Grid>
      </Box>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
