import React from 'react';
import Volume from './volume'
import Units from './units'
import { Box, Grid, makeStyles, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}));

function Overview(props, { className, ...rest }) {
  const classes = useStyles();
  const y = {
    officeVol: props.thisMonth?.office_volume,
    supremeVol: props.thisMonth?.supreme_volume,
    officeUnits: props.thisMonth?.office_units,
    supremeUnits: props.thisMonth?.supreme_units,
    mktVol: props.thisMonth?.market_share_volume,
    mktUnits: props.thisMonth?.market_share_units
  };
  let retro = props.lastYear[props.thisMonth?.month]
  const ly = {
    officeVol: retro ? retro.office_volume : 0,
    supremeVol: retro ? retro.supreme_volume : 0,
    officeUnits: retro ?retro.office_units : 0,
    supremeUnits: retro ?retro.supreme_units : 0,
    mktVol: retro ? retro.market_share_volume : 0,
    mktUnits: retro ? retro.market_share_units : 0
  }
  const calcChange = (name) => {
    let sv1 = y[name] - ly[name]
    let sv2 = sv1 / y[name]
    return (sv2 * 100).toFixed(2)
  }
  const insertCommas = (num) => {
    if(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return ''
    }
  }
  console.log('This Month', props.thisMonth)
  console.log('This Year', props.thisYear)
  console.log('Last Year', props.lastYear)
  return (
    <Grid container spacing={2} justify-self={'stretch'} className={classes.root}>
      <Grid item xs={6} spacing={1}>
        <Box>
          <Typography variant={"subtitle1"}>YTD Volume</Typography>
          <Volume y={y} ly={ly} insertCommas={insertCommas} calcChange={calcChange} />
        </Box>
      </Grid>
      <Grid item xs={6} spacing={1}>
        <Box>
          <Typography variant={"subtitle1"}>YTD Units</Typography>
          <Units y={y} ly={ly} insertCommas={insertCommas} calcChange={calcChange} />
        </Box>
      </Grid>
    </Grid>
  )
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;

