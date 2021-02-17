import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Tabs, Tab, Divider, makeStyles, CardHeader } from '@material-ui/core';
import MarketShareChart from './charts/MarketShareChart';
import VolumeOverTime from './charts/VolumeOverTime';
import UnitsOverTime from './charts/UnitsOverTime';
import {filterForYear} from '../../parsing'
import _ from 'lodash'



const useStyles = makeStyles(() => ({
  chart: {
    height: 325
  }
}));

function DataChart(props, { className, ...rest }) {
  let [tab, setTab] = useState(0)
  const classes = useStyles();
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const theRef = React.createRef()

  const handleTab = (event, value) => setTab(value);

  const tabToID = () => {
    switch(tab){
      case 0:
        return 'mkt-share-chart'
      case 1:
        return 'mkt-share-chart'
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
            prod={props.accountData}
            ly={filterForYear(props.accountData, 2019).map(x => x['YTD Market Share Volume'] * 100)}
            ytd={props.accountData.map(x => x['YTD Market Share Volume'] * 100)}
            labels={props.accountData.map(rec => {
              let month = rec['Date'].split(' ')[0].slice(0, 3)
              return month + '-' + rec['Date'].split(' ')[1]
            })}
            company={props.company}
            key={Math.floor(Math.random() * 101)}
            ref={theRef}
          />
        )
      case 1:
        return(
          <MarketShareChart
            className={classes.chart}
            ly={filterForYear(props.accountData, 2019).map(x => x['Market Share Units'] * 100)}
            ytd={filterForYear(props.accountData, 2020).map(x => x['Market Share Units'] * 100)}
            labels={_.uniq(_.map(props.accountData, x => x['Date'].slice(0,3)))}
            company={props.company}
            key={Math.floor(Math.random() * 101)}
          />
        )
      case 2:
        return(
          <VolumeOverTime
            className={classes.chart}
            labels={_.uniq(_.map(props.accountData, x => {
              return x['Date'].slice(0,3) + '-' + x['Year'].toString()
            }))}
            data={props.accountData.map(x => x['Supreme Volume'])}
            office={props.accountData.map(x => x['Office Volume'])}
            key={Math.floor(Math.random() * 101)}
          />
        )
      case 3:
        return(
          <UnitsOverTime
            className={classes.chart}
            labels={_.uniq(_.map(props.accountData, x => {
              return x['Date'].slice(0,3) + '-' + x['Year'].toString()
            }))}
            data={props.accountData.map(x => x['Supreme Units'])}
            office={props.accountData.map(x => x['Office Units'])}
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
      <CardHeader title="Market Share Over Time"/>
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={500} pt={4} pr={2} pl={2}>
          {renderGraph(0)}
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

DataChart.propTypes = {
  className: PropTypes.string
};

export default DataChart;

