import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, Typography, Grid, makeStyles, GridList, GridListTile } from '@material-ui/core';
import SimpleList from '../../Components/_Modules/deprecated/SimpleList'
import { asUSD } from '../../../functions/dataDisplayers';

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

  // let officers = props.account.loan_officers ? props.account.loan_officers.length : ''
  // let investment = props.account.monthly_investment ? '$' + insertCommas(props.account.monthly_investment) : ''
  // let lease = props.account.monthly_lease ? '$' + insertCommas(props.account.monthly_lease) : ''
  // let renewal = props.account.agreement_end ? props.account.agreement_end : ''
  // let agreement = props.account.agreement_date ? props.account.agreement_date : ''
  // let numOtherLenders = props.account.other_lenders ? props.account.other_lenders.length : ''

  console.log(props.account)
  if (props.account) {
    return (
      <Box paddingTop={3.5}>

      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Account Info"/>
        <Divider />
        <Box
          p={2}
          position="relative"
          minHeight={200}
          marginBottom={-2.5}
        >


          <SimpleList align={'right'} variant='subtitle1' noShift={false} text={
            ['Start Date', props.account['Start Date']]}
          />

          <SimpleList align={'right'} variant='subtitle1' noShift={false} text={
            props.account['Termination Date']
              ?
            ['Termination Date', props.account['Termination Date']]
              :
            ['Renewal Date', props.account['Renewal']]
          }
          />
          <SimpleList align={'right'} variant='subtitle1' noShift={false} text={
            ['Agents', props.account['Agent Count']]}
          />
          <SimpleList align={'right'} variant='subtitle1' noShift={false} text={
            ['Loan Officers', props.account['Loan Officer Count']]}
          />
          <SimpleList align={'right'} variant='subtitle1' noShift={false} text={
            ['Agent per Loan Officer', Math.round(props.account['Agent Count'] / props.account['Loan Officer Count'])]}
          />
          <SimpleList align={'right'} variant='subtitle1' noShift={false} text={
            ['Other Lenders', props.account['Count of Other Lenders']]}
          />


          {/*<Card*/}
          {/*  position={'relative'}*/}
          {/*  height={250}*/}
          {/*>*/}
          {/*  <CardHeader title='Costs' style={{textAlign: 'center'}}/>*/}
          {/*  <SimpleList align={'right'} variant='subtitle1' noShift={false} text={*/}
          {/*    ['Lead Investment (ASA)', asUSD(props.account['ASA Leads Cost'])]}*/}
          {/*  />*/}
          {/*  <SimpleList align={'right'} variant='subtitle1' noShift={false} text={*/}
          {/*    ['Lease Investment (ASA)', asUSD(props.account['ASA Lease Cost'])]}*/}
          {/*  />*/}
          {/*  <SimpleList align={'right'} variant='subtitle1' noShift={false} text={*/}
          {/*    ['Lead Investment (Lites)', asUSD(props.account['Lites Leads Cost'])]}*/}
          {/*  />*/}
          {/*  <SimpleList align={'right'} variant='subtitle1' noShift={false} text={*/}
          {/*    ['Lease Investment (Lites)', asUSD(props.account['Lites Lease Cost'])]}*/}
          {/*  />*/}
          {/*</Card>*/}


          {/*<SimpleList align={'right'} variant='subtitle1' noShift={true} text={*/}
            {/*  ['ASA Lead Investment', props.account['Lite Count']]}*/}
            {/*/>*/}


            {/*{props.account.agent_count ? <SimpleList align={'right'} variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Monthly Lead Investment', investment]}/>*/}
            {/*  : null}*/}

            {/*{props.account.agent_count ? <SimpleList align={'right'} variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Monthly Lease', lease]}/>*/}
            {/*  : null}*/}

            {/*{props.account.agent_count ? <SimpleList align={'right'} variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Agreement Start', agreement]}/>*/}
            {/*  : null}*/}

            {/*{props.account.agent_count ? <SimpleList align={'right'} variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Renewal Date', renewal]}/>*/}
            {/*  : null}*/}
        </Box>
      </Card>
      </Box>

    );
  } else {
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
          minHeight={380}
        >

        </Box>
      </Card>
    )
  }

}

EarningsSegmentation.propTypes = {
  className: PropTypes.string
};

export default EarningsSegmentation;
