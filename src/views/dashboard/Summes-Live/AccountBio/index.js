import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, Typography, Grid, makeStyles, GridList, GridListTile } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';
import { getHourNumbers } from '@material-ui/pickers/views/Clock/ClockNumbers';
import Salesforce from 'src/views/dashboard/Summes-Live/salesforce/salesforce'

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

  // console.log('bio props', props)
  if(props.report){
    // console.log('units', props.report.market_share_units)
  }
  console.log(props.account)
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={<GenericMoreButton />}
        title="Account Info"
      />
      <Divider />
      <Box
        p={2}
        position="relative"
        minHeight={265}
      >
        <Box
          p={1}
          position="relative"
          height={30}
        >
          <Typography variant="h2" color="textPrimary">
            {props.account.name}
          </Typography>
        </Box>
        <Box
          paddingTop={4}
          paddingLeft={2}
          position={'relative'}
          height={10}
        >
          <GridList cols={2} cellHeight={30}>
            <GridListTile>
              <Typography variant={'subtitle1'}>Number of Agents</Typography>
            </GridListTile>
            <GridListTile>
              <Typography variant={'subtitle1'}>
                {props.account.agent_count}
              </Typography>
            </GridListTile>

            <GridListTile>
              <Typography variant={'subtitle1'}>Number of Loan Officers</Typography>
            </GridListTile>
            <GridListTile>
              <Typography variant={'subtitle1'}>
                {props.account.loan_officers ? props.account.loan_officers.length : ''}
              </Typography>
            </GridListTile>

            <GridListTile>
              <Typography variant={'subtitle1'}>Monthly Lead Investment</Typography>
            </GridListTile>
            <GridListTile>
              <Typography variant={'subtitle1'}>
                {props.account.monthly_investment ? '$' + insertCommas(props.account.monthly_investment) : ''}
              </Typography>
            </GridListTile>

            <GridListTile>
              <Typography variant={'subtitle1'}>Monthly Lease</Typography>
            </GridListTile>
            <GridListTile>
              <Typography variant={'subtitle1'}>
                {props.account.monthly_lease ? '$' + insertCommas(props.account.monthly_lease) : ''}
              </Typography>
            </GridListTile>

            <GridListTile>
              <Typography variant={'subtitle1'}>Renewal Date</Typography>
            </GridListTile>
            <GridListTile>
              <Typography variant={'subtitle1'}>
                {props.account.agreement_end ? props.account.agreement_end : ''}
              </Typography>
            </GridListTile>
          </GridList>
        </Box>
      </Box>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
