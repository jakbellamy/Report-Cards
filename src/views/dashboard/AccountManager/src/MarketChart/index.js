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
  const [graphType, setGraphType] = useState('market_share_volume')
  const classes = useStyles();
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function graphTab(tab) {
    switch(tab) {
      case 0:
        return(
          <Chart
            className={classes.chart}
            data={props.stats}
            labels={labels}
            graphType={graphType}
            company={props.company}
          />
        )
      case 1:
        return(
          <Chart
            className={classes.chart}
            data={props.stats1}
            labels={labels}
            graphType={graphType}
            company={props.company}
          />
        )
    }
  }

  const handleClick = (type) => {
    setGraphType(type)
  }

  const handleTab = (event, value) => {
    handleClick(chartDict[value])
    setTab(value)
  }
  console.log('props \b', props)
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
          <Chart
            className={classes.chart}
            data={graphType === 'market_share_volume' ? props.stats : props.stats1}
            labels={labels}
            graphType={graphType}
            company={props.company}
          />
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
