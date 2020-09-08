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

function Leads(props, { className, ...rest }) {
  const classes = useStyles();

  let monthLeads = props.leads.filter(lead => lead.date === "2020-07-01")
  let quarterLeads = props.leads.filter(lead => lead.date >= "2020-07-01")

  let monthCount = monthLeads.length > 0 ? monthLeads[0]['leads'] : 0
  let quarterCount = quarterLeads.length > 0 ? quarterLeads.reduce((prev, cur) => prev + cur.leads) : 0
  // console.log(quarterCount)

  let title = props.account.monthly_customer_min ? `Lead Quota: ${props.account.monthly_customer_min}/Month` : 'Lead Quota'
  let month = props.account.monthly_customer_min ? `${monthCount} Out of ${props.account.monthly_customer_min}` : ''
  let quarter = props.account.monthly_customer_min ? `${monthCount} Out of ${Number(props.account.monthly_customer_min) * 4}` : ''
  let ytd = props.account.monthly_customer_min ? `000 Out of ${Number(props.account.monthly_customer_min) * 7}` : ''

  let monthCheck = monthCount > props.account.monthly_customer_min ? <CheckCircleIcon style={{color: "#25e565"}} /> : <NotInterestedIcon style={{color: "#e5252b"}}/>
  // let quarterCheck =
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title={title}/>
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={195}>

        <Grid container spacing={3}>

          <Grid item container spacing={3}>
            <Grid item xs={2}>
              {props.account.monthly_customer_min ? monthCheck : null}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" color="textPrimary">
                {props.account.monthly_customer_min ? 'July Delivery' : ''}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textPrimary">
                {month}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={2}>
              {props.account.monthly_customer_min ? monthCheck : null}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" color="textPrimary">
                {props.account.monthly_customer_min ? 'Quarter Delivery' : ''}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="textPrimary">
                {quarter}
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
