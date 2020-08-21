import React from 'react';
import { Box, Input, CardHeader, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Chart from './Chart';
import PropTypes from 'prop-types';
import CompareLineChart from './index';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function Comments(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.root, className)}
      {...rest}
      p={3}
      position="relative"
      minHeight={140}
    >
      <Divider />
      <CardHeader title="Comments"/>
      <Typography>{props.current.comment}</Typography>
    </Box>
  );
}

Comments.propTypes = {
  className: PropTypes.string
};

export default Comments;
