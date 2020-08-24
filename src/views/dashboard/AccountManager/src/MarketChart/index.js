import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Tabs, Tab, Divider, CardHeader, AppBar, Typography, makeStyles, Button } from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import Comments from './comments'

const useStyles = makeStyles(() => ({
  chart: {
    height: 325
  }
}));

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const chartDict = ['market_share_volume', 'market_share_units']

function CompareLineChart(props, { className, ...rest }) {
  let [tab, setTab] = useState(0)
  // console.log('line props', props.reports)
  const classes = useStyles();
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleClick = (type) => {
    props.setGraphType(type)
  }

  const handleTab = (event, value) => {
    console.log(value)
    handleClick(chartDict[value])
    setTab(value)
  }

  console.log('CHART CURRENT', props.current)
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
        </Tabs>
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={500} pt={4} pr={2} pl={2}>
          <Chart
            className={classes.chart}
            data={props.graphType == 'market_share_volume' ? props.stats : props.stats1}
            labels={labels}
            graphType={props.graphType}
            company={props.company}
          />
        </Box>
      </PerfectScrollbar>
      <Comments current={props.current}/>
    </Card>
  );
}

CompareLineChart.propTypes = {
  className: PropTypes.string
};

export default CompareLineChart;
