import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Tabs, Tab, Divider, Typography, makeStyles } from '@material-ui/core';
import Chart from './Chart';
import Comments from './comments'

const useStyles = makeStyles(() => ({
  chart: {
    height: 325
  }
}));

function CompareLineChart(props, { className, ...rest }) {
  let [tab, setTab] = useState(0)
  const [graphType, setGraphType] = useState('market_share_volume')
  const classes = useStyles();
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleTab = (event, value) => setTab(value);

  function renderGraph(tab) {
    switch(tab) {
      case 0:
        return(
          <Chart
            className={classes.chart}
            data={props.stats}
            labels={labels}
            company={props.company}
          />
        )
      case 1:
        return(
          <Chart
            className={classes.chart}
            data={props.stats1}
            labels={labels}
            company={props.company}
          />
        )
    }
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
        <Tabs
          value={tab}
          onChange={handleTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Market Share Volume"/>
          <Tab label="Market Share Units" />
          <Tab label="Volume Over Time" />
          <Tab label="Units Over Time" />
        </Tabs>
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={500} pt={4} pr={2} pl={2}>
          {renderGraph(tab)}
        </Box>
      </PerfectScrollbar>
      <Comments current={props.current} setCurrent={props.setCurrent}/>
    </Card>
  );
}

CompareLineChart.propTypes = {
  className: PropTypes.string
};

export default CompareLineChart;
