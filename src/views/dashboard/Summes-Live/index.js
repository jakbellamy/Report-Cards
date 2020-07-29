import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import AccountBio from './AccountBio';
import CompareLineChart from './CompareLineChart';
import Header from './Header';
import Overview from './Overview';
import CeEvents from './ceEvents'
import PpbEvents from './ppbEvents'
import Upcoming from './upcoming'
const methods = require('./methods')

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}))

let shell = {
  office_volume: 0,
  supreme_volume: 0,
  office_units: 0,
  supreme_units: 0
}

function DashboardAlternativeView() {
  const [accounts, setAccounts] = useState([])
  const [marketReports, setMarketReports] = useState([])
  const [selectedAccount, setSelectedAccount] = useState({name: '', id: -1})
  const [selectedReports, setSelectedReports] = useState([{current: shell, raw:{ly: [], y: []}, ytd:{ly: [], y:[]}}])
  const classes = useStyles();

  const fetchData = async () => {
    await fetch('http://127.0.0.1:8000/api/accounts/')
      .then(res => res.json())
      .then(res => setAccounts(res))
    await fetch("http://127.0.0.1:8000/api/market-share-reports/")
      .then(res => res.json())
      .then(res => setMarketReports(res))
  }

  useEffect(() => {
    fetchData()
  }, []);


  const coerceReports = (account) => {
    let now = new Date()
    now = now.getFullYear()

    let reports = marketReports.filter(report => report.account === account.id)

    let ly = reports.filter(report => {
      return methods.getYear(report) === now - 1
    })

    let y = reports.filter(report => {
      return methods.getYear(report) === now
    })

    return {y: y, ly: ly}
  }

  const buildData = (reports) => {
    let raw = coerceReports(reports)
    let ytd = {
      ly: methods.accuYtd(raw.ly),
      y: methods.accuYtd(raw.y)
    }
    let current = methods.getCurrentReport(ytd.ly)
    return {raw: raw, ytd: ytd, current: current}
  }

  const handleAccountSelection = (account) => {
    setSelectedAccount(account)
    setSelectedReports(buildData(account))
  }

  console.log('current', selectedReports.current)
  return (
    <Page className={classes.root} title="Dashboard Alternative">
      <Container maxWidth={false} className={classes.container}>
        <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection}/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Overview report={selectedReports.current}/>
          </Grid>
          <Grid item lg={8} xl={9} xs={12}>
            <CompareLineChart selectedAccount={selectedAccount} reports={methods.getReportPercent(selectedReports.ytd, 'market_share_volume')}/>
          </Grid>
          <Grid item lg={4} xl={3} xs={12}>
            <AccountBio account={selectedAccount} report={selectedReports.current}/>
          </Grid>
          <Grid item lg={4} xs={12}>
            <CeEvents account={selectedAccount} report={selectedReports.current}/>
          </Grid>
          <Grid item lg={4} xs={12}>
            <PpbEvents account={selectedAccount} report={selectedReports.current}/>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Upcoming account={selectedAccount} report={selectedReports.current}/>
          </Grid>
          <Grid item lg={8} xs={12}>
            {/*<MostProfitableProducts />*/}
            {/*<FinancialStats selectedAccount={selectedAccount}/>*/}
          </Grid>
          <Grid item lg={4} xs={12}>
            {/*<TopReferrals />*/}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
