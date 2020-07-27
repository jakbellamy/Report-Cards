import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function CompareLineChart(props, { className, ...rest }) {
  const classes = useStyles();
  const stats = {
    thisYear: [],
    lastYear: props.reports.ly
  };


  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader action={<GenericMoreButton />} title="Market Share Volume"/>
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700} pt={4} pr={2} pl={2}>
          <Chart
            className={classes.chart}
            data={stats}
            labels={labels}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

CompareLineChart.propTypes = {
  className: PropTypes.string
};

export default CompareLineChart;
