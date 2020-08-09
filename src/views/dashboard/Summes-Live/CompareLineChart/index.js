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

  const handleClick = (type) => {
    props.setGraphType(type)
  }
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
          <Button><CardHeader onClick={() => handleClick('market_share_units')} title="Market Share Volume"/></Button>
          <Button><CardHeader onClick={() => handleClick('market_share_volume')} title="Market Share Units"/></Button>
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700} pt={4} pr={2} pl={2}>
          <Chart
            className={classes.chart}
            data={props.graphType == 'market_share_volume' ? props.stats : props.stats1}
            labels={labels}
            graphType={props.graphType}
            company={props.company}
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
