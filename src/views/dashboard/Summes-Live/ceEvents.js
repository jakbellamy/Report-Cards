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
    textAlign: 'left',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    padding: theme.spacing(1, 1),
  },
  line: {
    padding: theme.spacing(0.5, 4)
  },
  grid: {
    padding: theme.spacing(1.5, 0)
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
      <CardHeader action={<GenericMoreButton />} title="Continuing Education"/>
      <Divider />
      <Box p={3} position="relative" minHeight={320}>
        <Typography variant="h4" color="textPrimary" className={classes.item}>
          Last Year
        </Typography>
        <Grid container spacing={3} className={classes.grid}>

          <Grid container spacing="flex" className={classes.line}>
            <Grid item xs={10}>
              <Typography variant="h5" color="textPrimary">
                Number of Events
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" color="textPrimary">
                0
              </Typography>
            </Grid>
          </Grid >

          <Grid container spacing="flex" className={classes.line}>
            <Grid item xs={10}>
              <Typography variant="h5" color="textPrimary">
                Number of Agents Trained
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" color="textPrimary">
                0
              </Typography>
            </Grid>
          </Grid >

          <Grid container spacing="flex" className={classes.line}>
            <Grid item xs={10}>
              <Typography variant="h5" color="textPrimary">
                Topics Trained
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" color="textPrimary">

              </Typography>
            </Grid>
          </Grid >

        </Grid>

        <Typography variant="h4" color="textPrimary" className={classes.item}>
          This Year
        </Typography>
        <Grid container spacing={3} className={classes.grid}>

          <Grid container spacing="flex" className={classes.line}>
            <Grid item xs={10}>
              <Typography variant="h5" color="textPrimary">
                Number of Events
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" color="textPrimary">
                0
              </Typography>
            </Grid>
          </Grid >

          <Grid container spacing="flex" className={classes.line}>
            <Grid item xs={10}>
              <Typography variant="h5" color="textPrimary">
                Number of Agents Trained
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" color="textPrimary">
                0
              </Typography>
            </Grid>
          </Grid >

          <Grid container spacing="flex" className={classes.line}>
            <Grid item xs={10}>
              <Typography variant="h5" color="textPrimary">
                Topics Trained
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h5" color="textPrimary">

              </Typography>
            </Grid>
          </Grid >

        </Grid>
      </Box>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
