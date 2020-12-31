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
            <SimpleList variant='subtitle1' noShift={true} text={
              ['Number of Agents', props.account['Agent Count']]}
            />

            {/*{props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Number of Loan Officers', officers]}/>*/}
            {/*  : null}*/}

            {/*{props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true}*/}
            {/*                                         text={['Number of Other Lenders', numOtherLenders]}/>*/}
            {/*  : null}*/}

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
