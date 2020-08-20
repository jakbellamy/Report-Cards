import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

function Title(props, { className, ...rest }) {
  return (
    <Box paddingBottom={3} paddingTop={3}>
      <Typography align={props.align} variant={props.variant}>
        {props.text}
      </Typography>
    </Box>
  );
}

Title.propTypes = {
  className: PropTypes.string
};

export default Title;
