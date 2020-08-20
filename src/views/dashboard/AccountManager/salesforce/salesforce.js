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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

function Salesforce(props, { className, ...rest }) {
  const classes = useStyles();

  let title = props.account.monthly_customer_min ? `Lead Quota: ${props.account.monthly_customer_min}/Month` : 'Lead Quota'
  let month = props.account.monthly_customer_min ? `000 Out of ${props.account.monthly_customer_min}` : ''
  let quarter = props.account.monthly_customer_min ? `000 Out of ${Number(props.account.monthly_customer_min) * 4}` : ''
  let ytd = props.account.monthly_customer_min ? `000 Out of ${Number(props.account.monthly_customer_min) * 7}` : ''
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
          <Grid item xs={2}>

          </Grid>
          <Grid item xs={9}>
            <Box height={50}>
              <GridList cols={2}>
                <GridListTile>
                  <Typography variant="subtitle1" color="textPrimary">
                    June Delivery
                  </Typography>
                </GridListTile>
                <GridListTile>
                  <Typography variant="subtitle1" color="textPrimary">
                    {month}
                  </Typography>
              </GridListTile>
              </GridList>
            </Box>

            <Box height={50}>
              <GridList cols={2}>
                <GridListTile>
                  <Typography variant="subtitle1" color="textPrimary">
                    Quarter Delivery
                  </Typography>
                </GridListTile>
                <GridListTile>
                  <Typography variant="subtitle1" color="textPrimary">
                    {quarter}
                  </Typography>
                </GridListTile>
              </GridList>
            </Box>

            <Box height={50}>
              <GridList cols={2}>
                <GridListTile>
                  <Typography variant="subtitle1" color="textPrimary">
                   YTD Delivery
                  </Typography>
                </GridListTile>
                <GridListTile>
                  <Typography variant="subtitle1" color="textPrimary">
                    {ytd}
                  </Typography>
                </GridListTile>
              </GridList>
            </Box>

          </Grid>
        </Grid>
      </Box>


    </Card>
  );
}

Salesforce.propTypes = {
  className: PropTypes.string
};

export default Salesforce;
