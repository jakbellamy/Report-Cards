import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, Typography, Grid, makeStyles } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
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
    padding: theme.spacing(1.2, 1)
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
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Account Bio"
      />
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={320}
      >
        <Grid container spacing={3} className={{}}>
          <Grid item xs={9}>
            <Typography variant="h3" color="textPrimary">
              {props.account.name}
            </Typography>
          </Grid>
        </Grid >
        <Typography variant="h6" color="textPrimary">
          {props.account.legal_name}
        </Typography>

        <Grid container spacing="flex" className={classes.line}>
          <Grid item xs={8}>
            <Typography variant="h5" color="textPrimary">
              Username
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="textPrimary">
              {props.account.username}
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex" className={classes.line}>
          <Grid item xs={8}>
            <Typography variant="h5" color="textPrimary">
              Agents
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="textPrimary">
              0
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex" className={classes.line}>
          <Grid item xs={8}>
            <Typography variant="h5" color="textPrimary">
              Started
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="textPrimary">
              {props.account.agreement_date ? props.account.agreement_date : ''}
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex" className={classes.line}>
          <Grid item xs={8}>
            <Typography variant="h5" color="textPrimary">
              Monthly Investment
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="textPrimary">
              ${insertCommas(props.account.monthly_investment)}
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex" className={classes.line}>
          <Grid item xs={8}>
            <Typography variant="h5" color="textPrimary">
              Monthly Expense
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="textPrimary">
              ${insertCommas(props.account.monthly_expense)}
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex" className={classes.line}>
          <Grid item xs={8}>
            <Typography variant="h5" color="textPrimary">
              Min. Customers/month
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" color="textPrimary">
              {insertCommas(props.account.monthly_customer_min)}
            </Typography>
          </Grid>
        </Grid >

      </Box>
      <Divider />
      <Box display="flex">

        <div className={classes.item}>
          <Typography variant="h5" color="textPrimary">
            {props.account.name ? '98.94%' : '0%'}
          </Typography>
          <Typography
            variant="overline"
            color="textSecondary"
          >
            COT/FOT
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h5" color="textPrimary">
            {props.account.name ? '89.05%' : '0%'}
          </Typography>
          <Typography
            variant="overline"
            color="textSecondary"
          >
            CSAT Top Box
          </Typography>
        </div>

        <div className={classes.item}>
          <Typography variant="h5" color="textPrimary">
            {props.account.name ? '98.10%' : '0%'}
          </Typography>
          <Typography
            variant="overline"
            color="textSecondary"
          >
            CSAT Top Two
          </Typography>
        </div>
      </Box>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
