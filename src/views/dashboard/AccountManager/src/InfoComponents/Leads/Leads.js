import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Grid,
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

const accumulateLeads = (arr) => {
  let counter = 0
  for(let month of arr){
    counter += month.leads
  }
  return counter
}

function Leads(props, { className, ...rest }) {
  const classes = useStyles();

  // let monthLeads = props.leads.filter(lead => lead.date === "2020-08-01")
  // let lastMonthLeads = props.leads.filter(lead => lead.date === "2020-07-01")
  // let quarterLeads = props.leads.filter(lead => lead.date >= "2020-07-01")
  //
  // let monthCount = monthLeads.length > 0 ? monthLeads[0]['leads'] : 0
  // let lastMonthCount = lastMonthLeads.length > 0 ? lastMonthLeads[0]['leads'] : 0
  // let quarterCount = quarterLeads.length > 0 ? accumulateLeads(quarterLeads) : 0
  //
  // let title = props.account.monthly_customer_min ? `Lead Quota: ${props.account.monthly_customer_min}/Month` : 'Lead Quota'
  // let lastMonth = props.account.monthly_customer_min ? `${lastMonthCount} Out of ${props.account.monthly_customer_min}` : ''
  // let month = props.account.monthly_customer_min ? `${monthCount} Out of ${props.account.monthly_customer_min}` : ''
  // let quarter

  // if(props.account.monthly_customer_min){
  //   if(quarterCount > (Number(props.account.monthly_customer_min) * 2)){
  //     quarter = 'On Pace for Q3'
  //   } else {
  //     quarter = 'Off Pace for Q3'
  //   }
  // } else {
  //   quarter = ''
  // }

  // const monthCheck = (monthCount) => monthCount >= props.account.monthly_customer_min ? <CheckCircleIcon style={{color: "#25e565"}} /> : <NotInterestedIcon style={{color: "#e5252b"}}/>
  // let quarterCheck = quarterCount >= (props.account.monthly_customer_min * 2) ? <CheckCircleIcon style={{color: "#25e565"}} /> : <NotInterestedIcon style={{color: "#e5252b"}}/>

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title={'Leads Compliance'}/>
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={380}>

        <Grid container spacing={3}>

          <Grid item container spacing={3}>
            <Grid item xs={2}>
              {/*{props.account.monthly_customer_min ? monthCheck(lastMonthCount) : null}*/}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" color="textPrimary">
                {/*{props.account.monthly_customer_min ? 'July Delivery' : ''}*/}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textPrimary">
                {/*{lastMonth}*/}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={2}>
              {/*{props.account.monthly_customer_min ? monthCheck(monthCount) : null}*/}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" color="textPrimary">
                {/*{props.account.monthly_customer_min ? 'August Delivery' : ''}*/}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textPrimary">
                {/*{month}*/}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={2}>
              {/*{props.account.monthly_customer_min ? quarterCheck : null}*/}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textPrimary">
                {/*{props.account.monthly_customer_min ? quarter : ''}*/}
              </Typography>
            </Grid>
          </Grid>

        </Grid>
      </Box>


    </Card>
  );
}

Leads.propTypes = {
  className: PropTypes.string
};

export default Leads;
