import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, Typography, Grid, makeStyles, GridList, GridListTile } from '@material-ui/core';
import SimpleList from '../../Modules/SimpleList'

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
          <Box
            p={1}
            position="relative"
            height={30}
            marginBottom={2.5}
          >
            <Typography variant="h2" color="textPrimary">
              {props.account['Account']}
            </Typography>
          </Box>
          <Card
            position={'relative'}
            height={250}
          >
            <CardHeader title='Staffing' style={{textAlign: 'center'}}/>
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Agents', props.account['Agent Count']]}
            />
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Loan Officers', props.account['Loan Officer Count']]}
            />
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Other Lenders', props.account['Count of Other Lenders']]}
            />
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Associated Lite Accounts', props.account['Lite Count']]}
            />
          </Card>
          <Card
            position={'relative'}
            height={250}
          >
            <CardHeader title='Costs' style={{textAlign: 'center'}}/>
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Lead Investment (ASA)', props.account['ASA Leads Cost']]}
            />
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Lease Investment (ASA)', props.account['ASA Lease Cost']]}
            />
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Lead Investment (Lites)', props.account['Lites Leads Cost']]}
            />
            <SimpleList variant='subtitle1' noShift={false} text={
              ['Lease Investment (Lites)', props.account['Lites Lease Cost']]}
            />
          </Card>


          {/*<SimpleList variant='subtitle1' noShift={true} text={*/}
            {/*  ['ASA Lead Investment', props.account['Lite Count']]}*/}
            {/*/>*/}


            {/*{props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Monthly Lead Investment', investment]}/>*/}
            {/*  : null}*/}

            {/*{props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Monthly Lease', lease]}/>*/}
            {/*  : null}*/}

            {/*{props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Agreement Start', agreement]}/>*/}
            {/*  : null}*/}

            {/*{props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Renewal Date', renewal]}/>*/}
            {/*  : null}*/}
        </Box>
      </Card>
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
