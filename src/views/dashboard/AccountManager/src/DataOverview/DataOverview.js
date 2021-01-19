import React from 'react';
import Volume from './volume'
import Units from './units'
import { Box, Grid, makeStyles, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {filterForYear, find_ly} from '../../parsing'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1)
  }
}));

function DataOverview(props, { className, ...rest }) {
  const classes = useStyles();
  let y = {
    officeVol: 0,
    supremeVol: 0,
    officeUnits: 0,
    supremeUnits: 0,
    mktVol: 0,
    mktUnits: 0
  }
  let ly = {
    officeVol: 0,
    supremeVol: 0,
    officeUnits: 0,
    supremeUnits: 0,
    mktVol: 0,
    mktUnits: 0
  }

  if(props.thisMonth){
    y = {
      officeVol: props.thisMonth['YTD Office Volume'] ? props.thisMonth['YTD Office Volume'] : 0,
      supremeVol: props.thisMonth['YTD Supreme Volume'] ? props.thisMonth['YTD Supreme Volume'] : 0,
      officeUnits: props.thisMonth['YTD Office Units'] ? props.thisMonth['YTD Office Units'] : 0,
      supremeUnits: props.thisMonth['YTD Supreme Units'] ? props.thisMonth['YTD Supreme Units'] : 0,
      mktVol: props.thisMonth['YTD Market Share Volume'] ? props.thisMonth['YTD Market Share Volume'].toFixed(2) : 0,
      mktUnits: props.thisMonth['YTD Market Share Units'] ? props.thisMonth['YTD Market Share Units'].toFixed(2) : 0
    };
    let retro = find_ly(props.accountData)
    if(retro){
      ly = {
        officeVol: retro['YTD Office Volume'] ? retro['YTD Office Volume'] : 0,
        supremeVol: retro['YTD Supreme Volume'] ? retro['YTD Supreme Volume'] : 0,
        officeUnits: retro['YTD Office Units'] ? retro['YTD Office Units'] : 0,
        supremeUnits: retro['YTD Supreme Units'] ? retro['YTD Supreme Units'] : 0,
        mktVol: retro['YTD Market Share Volume'] ? retro['YTD Market Share Volume'].toFixed(2) : 0,
        mktUnits: retro['YTD Market Share Units'] ? retro['YTD Market Share Units'].toFixed(2) : 0
      };
    }
  }

  const calcChange = (name) => {
    let sv1 = y[name] - ly[name]
    let sv2 = sv1 / ly[name]
    return (sv2 * 100).toFixed(2)
  }

  const insertCommas = (num) => {
    if(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return ''
    }
  }

  return (
    <Grid container spacing={2} justify-self={'stretch'} className={classes.root}>
      <Grid item xs={6} spacing={1}>
        <Box>
          <Typography variant={"subtitle1"}>YTD Volume</Typography>
          <Volume y={y} ly={ly} insertCommas={insertCommas} calcChange={calcChange} key={Math.floor(Math.random() * 101)} />
        </Box>
      </Grid>
      <Grid item xs={6} spacing={1}>
        <Box>
          <Typography variant={"subtitle1"}>YTD Units</Typography>
          <Units y={y} ly={ly} insertCommas={insertCommas} calcChange={calcChange} key={Math.floor(Math.random() * 101)} />
        </Box>
      </Grid>
    </Grid>
  )
}

DataOverview.propTypes = {
  className: PropTypes.string
};

export default DataOverview;

