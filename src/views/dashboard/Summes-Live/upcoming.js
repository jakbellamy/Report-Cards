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
    padding: theme.spacing(2, 1)
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

  // console.log('bio props', props)
  if(props.report){
    // console.log('units', props.report.market_share_units)
  }
  return (
    <Card className={clsx(classes.root, className)}{...rest}>
      <CardHeader action={<GenericMoreButton />} title="Upcoming Events"/>
      <Divider />
      <Box p={3} position="relative" minHeight={320}>
        <Grid container spacing={3}>

        </Grid>
      </Box>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
