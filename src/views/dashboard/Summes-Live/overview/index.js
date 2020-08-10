import React from 'react';
import Volume from './volume'
import Units from './units'
import { Box, Grid, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  },
}));

function Overview(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justify-self={'stretch'} className={classes.root}>
      <Grid item xs={6} xl={2} spacing={1}>
        <Volume />
      </Grid>
      <Grid item xs={6} xl={2} spacing={1}>
        <Units />
      </Grid>
    </Grid>
  )
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;

