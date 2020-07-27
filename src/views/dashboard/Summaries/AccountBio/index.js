import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Card, CardHeader, Divider, Typography, Grid, makeStyles } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';

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
  }
}));

function EarningsSegmentation({ className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  // const [earnings, setEarnings] = useState(null);
  //
  // const getEarnings = useCallback(() => {
  //   axios
  //     .get('/api/dashboard/earnings')
  //     .then((response) => {
  //       if (isMountedRef.current) {
  //         setEarnings(response.data.earnings);
  //       }
  //     });
  // }, [isMountedRef]);
  //
  // useEffect(() => {
  //   getEarnings();
  // }, [getEarnings]);
  //
  // if (!earnings) {
  //   return null;
  // }

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
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <Typography variant="h3" color="textPrimary">
              BHG First Florida
            </Typography>
          </Grid>
        </Grid >
        <Typography variant="h6" color="textPrimary">
          777 S. Federal Hwy, Ft. Lauderdale, FL 33316
        </Typography>
        <Typography variant="h6" color="textPrimary">
          _
        </Typography>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="h6" color="textPrimary">
              Manager
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" color="textPrimary">
              Bob Willis
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex">
          <Grid item xs={7}>
            <Typography variant="h6" color="textPrimary">
              OP
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" color="textPrimary">
              Gene Whiddon
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex">
          <Grid item xs={7}>
            <Typography variant="h6" color="textPrimary">
              Monthly Investment
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" color="textPrimary">
              $5,280
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex">
          <Grid item xs={7}>
            <Typography variant="h6" color="textPrimary">
              Min Customers/Month
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" color="textPrimary">
              132
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex">
          <Grid item xs={7}>
            <Typography variant="h6" color="textPrimary">
              Office Lease
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" color="textPrimary">
              $2,550
            </Typography>
          </Grid>
        </Grid >

        <Grid container spacing="flex">
          <Grid item xs={7}>
            <Typography variant="h6" color="textPrimary">
              Monthly Expense
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" color="textPrimary">
              $7,830
            </Typography>
          </Grid>
        </Grid >

      </Box>
      <Divider />
      <Box display="flex">

          <div className={classes.item}>
            <Typography variant="h4" color="textPrimary">
              31.5%
            </Typography>
            <Typography
              variant="overline"
              color="textSecondary"
            >
              YTD Market Volume
            </Typography>
          </div>

        <div className={classes.item}>
          <Typography variant="h4" color="textPrimary">
            43.5%
          </Typography>
          <Typography
            variant="overline"
            color="textSecondary"
          >
            YTD Market Units
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
