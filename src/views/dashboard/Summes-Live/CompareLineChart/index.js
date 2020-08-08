import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function CompareLineChart(props, { className, ...rest }) {
  // console.log('line props', props.reports)
  const classes = useStyles();
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {
        props.graphType == 'market_share_volume' ?
          <Button><CardHeader onClick={() => props.setGraphType('market_share_units')} title="Market Share Volume"/></Button>
          :
          <Button><CardHeader onClick={() => props.setGraphType('market_share_volume')} title="Market Share Units"/></Button>
      }
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700} pt={4} pr={2} pl={2}>
          <Chart
            className={classes.chart}
            data={props.stats}
            labels={labels}
            graphType={props.graphType}
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
