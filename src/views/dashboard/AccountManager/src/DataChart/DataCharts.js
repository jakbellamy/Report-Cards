import React, { useState } from 'react';
// import ReactDOM from 'react-dom'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Tabs, Tab, Divider, makeStyles } from '@material-ui/core';
import MarketShareChart from './charts/MarketShareChart';
import Comments from './comments'
import VolumeOverTime from './charts/VolumeOverTime';
import UnitsOverTime from './charts/UnitsOverTime';

const useStyles = makeStyles(() => ({
  chart: {
    height: 325
  }
}));

function DataChart(props, { className, ...rest }) {
  let [tab, setTab] = useState(0)
  const classes = useStyles();
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels2 = props.stats2Labels;

  const statsOverTime = (type, source) => {
    if(!source){
      return [];
    } else {
      return source.map(record => {
        return record[type];
      });
    }
  };
  const handleTab = (event, value) => setTab(value);

  const tabToID = () => {
    switch(tab){
      case 0:
        return 'market-share-chart'
      case 1:
        return 'market-share-chart'
      case 2:
        return 'volume-over-time'
      case 3:
        return 'units-over-time'
    }
  }

  function renderGraph(tab) {
    switch(tab) {
      case 0:
        return(
          <MarketShareChart
            className={classes.chart}
            data={props.stats}
            labels={labels}
            company={props.company}
            key={Math.floor(Math.random() * 101)}
          />
        )
      case 1:
        return(
          <MarketShareChart
            className={classes.chart}
            data={props.stats1}
            labels={labels}
            company={props.company}
            key={Math.floor(Math.random() * 101)}
          />
        )
      case 2:
        return(
          <VolumeOverTime
            className={classes.chart}
            labels={labels2}
            data={statsOverTime('supreme_volume', props.stats2)}
            office={statsOverTime('office_volume', props.stats2)}
            key={Math.floor(Math.random() * 101)}
          />
        )
      case 3:
        return(
          <UnitsOverTime
            className={classes.chart}
            labels={labels2}
            data={statsOverTime('supreme_units', props.stats2)}
            office={statsOverTime('office_units', props.stats2)}
            key={Math.floor(Math.random() * 101)}
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
      <Comments current={props.current} setCurrent={props.setCurrent} htmlID={tabToID()}/>
    </Card>
  );
}

DataChart.propTypes = {
  className: PropTypes.string
};

export default DataChart;

