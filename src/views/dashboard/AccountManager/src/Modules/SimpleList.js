import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

function Title(props, { className, ...rest }) {
  return (
    <Box position="relative" paddingBottom={props.height ? props.height : 2}>
      <Grid container spacing={0}>
        {props.noShift ? null : props.x1 == 0 ? null : <Grid item xs={1}/>}
        <Grid item xs={props.noShift ? 5 : props.x2 ? props.x2 : 5}>
          <Typography variant={props.variant} align={props.align}>
            {props.text[0]}
          </Typography>
        </Grid>
        <Grid item xs={props.noShift ? 4 : props.x3 ? props.x3 : 4}>
          <Typography variant={props.variant} align={props.align ? props.align : 'right'}>
            {props.text[1]}
          </Typography>
        </Grid>
        <Grid item xs={props.noShift ? 3 : props.x4 ? props.x4 : 2}/>
      </Grid>
    </Box>
  );
}

Title.propTypes = {
  className: PropTypes.string
};

export default Title;
