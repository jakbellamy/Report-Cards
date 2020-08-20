import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, Typography, Grid, makeStyles, GridList, GridListTile } from '@material-ui/core';
import SimpleList from '../_Components/SimpleList'

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const insertCommas = (num) => {
  if(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num
  }
}

function EarningsSegmentation(props, { className, ...rest }) {
  const classes = useStyles();

  let officers = props.account.loan_officers ? props.account.loan_officers.length : ''
  let investment = props.account.monthly_investment ? '$' + insertCommas(props.account.monthly_investment) : ''
  let lease = props.account.monthly_lease ? '$' + insertCommas(props.account.monthly_lease) : ''
  let renewal = props.account.agreement_end ? props.account.agreement_end : ''

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Account Info"/>
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
          height={250}
        >
          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}
             text={['Number of Agents', props.account.agent_count]}/>
            : null}

          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}
             text={['Number of Loan Officers', officers]}/>
            : null}

          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}
             text={['Monthly Lead Investment', investment]}/>
            : null}

          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}
             text={['Monthly Lease', lease]}/>
            : null}

          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}
             text={['Renewal Date', renewal]}/>
            : null}

        </Box>
      </Box>
    </Card>
  );
}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
