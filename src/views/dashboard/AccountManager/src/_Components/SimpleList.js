import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

function Title(props, { className, ...rest }) {
  return (
    <Box position="relative" paddingBottom={props.height ? props.height : 2}>
      <Grid container spacing={0}>
        {props.noShift ? null : <Grid item xs={1}/>}
        <Grid item xs={props.noShift ? 5 : 5}>
          <Typography variant={props.variant} align={props.align}>
            {props.text[0]}
          </Typography>
        </Grid>
        <Grid item xs={props.noShift ? 4 : 4}>
          <Typography variant={props.variant} align={'right'}>
            {props.text[1]}
          </Typography>
        </Grid>
        <Grid item xs={props.noShift ? 3 : 2}/>
      </Grid>
    </Box>
  );
}

Title.propTypes = {
  className: PropTypes.string
};

export default Title;
