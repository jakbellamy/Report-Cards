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
  supreme_units: 0,
  market_share_volume: 0,
  market_share_units: 0
}
const year_shell = {1: shell, 2: shell, 3: shell, 4: shell, 5: shell, 6: shell, 7: shell, 8: shell, 9: shell, 10: shell, 11: shell, 12: shell}

function DashboardAlternativeView() {
  const [isSelected, setIsSelected] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [lyReports, setLyReports] = useState([])
  const [ly, setLy] = useState(year_shell)
  const [ytd, setYtd] = useState(year_shell)
  const [current, setCurrent] = useState(shell)
  const [ytdReports, setYtdReports] = useState([])
  const [selectedAccount, setSelectedAccount] = useState({name: '', id: -1})
  const [selectedReports, setSelectedReports] = useState([{current: shell, ly: [], y: [], mkt_vol: {ly: [], y: []}, mkt_units:{ly: [], y: []}}])
  const [graphType, setGraphType] = useState('market_share_volume')
  const [stats, setStats] = useState({ly: [], y: []})
  const classes = useStyles();

  const fetchData = async () => {
    await fetch('https://djsupreme.herokuapp.com/api/accounts/')
      .then(res => res.json())
      .then(res => setAccounts(res))
    await fetch("https://djsupreme.herokuapp.com/data/ly")
      .then(res => res.json())
      .then(res => setLyReports(res))
    await fetch("https://djsupreme.herokuapp.com/data/y")
      .then(res => res.json())
      .then(res => setYtdReports(res))
  }

  useEffect(() => {
    fetchData()
  }, []);

  const buildTableData = (yo, lyo) => {
    let ya = [], lya = []
    for(let month in yo){
      ya.push(yo[month])
    }
    for(let month in lyo){
      lya.push(lyo[month])
    }
    return {
      y: ya.map(report => report[graphType]),
      ly: lya.map(report => report[graphType])
    }
  }

  const buildLy = (account, lyf) => {
    let ly_shell = Object.assign({}, year_shell)
    for (const report of lyf){
      ly_shell[report['month']] = report
    }
    return ly_shell
  }
  const buildYtd = (account, yf) => {
    let ytd_shell = Object.assign({}, year_shell)
    for (const report of yf){
      ytd_shell[report['month']] = report
    }
    console.log('year shell: ', year_shell)
    return ytd_shell
  }

  const coerceReports = (account) => {
    let yf = ytdReports.filter(report => report.account_id === account.id)
    let lyf = lyReports.filter(report => report.account_id === account.id)

    setLy(buildLy(account, lyf))
    setYtd(buildYtd(account, yf))
    setCurrent(yf.sort((a, b) => b.date - a.date)[0])

    setStats(buildTableData(buildLy(account, lyf), buildYtd(account, yf)))

    let current = yf.sort((a, b) => b.date - a.date)[0]
    return {
      y: yf,
      ly: lyf,
      current: current,
      oy: lyf.filter(rep => new Date(rep.date).getMonth() == new Date(current.date).getMonth())
    }
  }

  const handleAccountSelection = (account) => {
    setSelectedAccount(account)
    setSelectedReports(coerceReports(account))
  }

  console.log('current', selectedReports)
  return (
    <Page className={classes.root} title="Dashboard Alternative">
      <Container maxWidth={false} className={classes.container}>
        <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection}/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Overview thisYear={ytd} lastYear={ly} thisMonth={current} />
          </Grid>
          <Grid item lg={8} xl={9} xs={12}>
            <CompareLineChart selectedAccount={selectedAccount} stats={stats} graphType={graphType} setGraphType={setGraphType}/>
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
