import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import AccountBio from './src/AccountBio/Bio';
import CompareLineChart from './src/MarketChart';
import Header from './src/Header';
import Overview from './src/Overview/index';
import Leads from './src/Leads/Leads'
import PersonalBest from './src/PersonalBest/PersonalBest'
import Education from './src/ContinuingEducation/Education'
import Contacts from './src/Contacts/Contacts'
import ReportStatus from './src/ReportStatus/ReportStatus';
const methods = require('./functions/methods')

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minWidth: '100%'
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
  const [accounts, setAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState({name: 'Choose Account', id: -1})
  const [lyReports, setLyReports] = useState([])
  const [ytdReports, setYtdReports] = useState([])
  const [ly, setLy] = useState(year_shell)
  const [ytd, setYtd] = useState(year_shell)
  const [current, setCurrent] = useState(shell)
  const [graphType, setGraphType] = useState('market_share_volume')
  const [stats, setStats] = useState({ly: [], y: [], avg: []})
  const [stats1, setStats1] = useState({ly: [], y: [], avg: []})
  const [company, setCompany] = useState({ly: [], y: [], avg: []})
  const classes = useStyles();

  const fetchData = async () => {
    await fetch('https://djsupreme.herokuapp.com/api/accounts/')
      .then(res => res.json())
      .then(res => res.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        }))
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

  const buildTableData = (yo, lyo, avgo, type) => {
    let ya = [], lya = [], avga = []
    for(let month in yo){
      ya.push(yo[month])
    }
    for(let month in lyo){
      lya.push(lyo[month])
    }
    for(let month in lyo){
      avga.push(avgo[month])
    }
    console.log(graphType)
    return {
      y: ya.map(report => report[type]),
      ly: lya.map(report => report[type]),
      avg: avga.map(report => report[type])
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
    return ytd_shell
  }

  const coerceReports = (account) => {
    let yf = ytdReports.filter(report => report.account_id === account.id)
    let lyf = lyReports.filter(report => report.account_id === account.id)
    let avgf = lyReports.filter(report => report.account_id === 25)
    setLy(buildLy(account, lyf))
    setYtd(buildYtd(account, yf))
    setCurrent(yf.sort((a, b) => b.date - a.date)[0])
    setStats(buildTableData(buildLy(account, lyf), buildYtd(account, yf), buildLy(account, avgf), 'market_share_volume'))
    setStats1(buildTableData(buildLy(account, lyf), buildYtd(account, yf), buildLy(account, avgf), 'market_share_units'))
    console.log(avgf)
  }

  const handleAccountSelection = (account) => {
    setSelectedAccount(account)
    coerceReports(account)
  }
  console.log('ly', lyReports)
  return (
    <Page className={classes.root} title="Dashboard Alternative">
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection}/>
          <Grid item xs={7} spacing={3}>
            <Overview thisYear={ytd} lastYear={ly} thisMonth={current}/>
            <CompareLineChart stats={stats} stats1={stats1} graphType={graphType} setGraphType={setGraphType}/>
            <Education />
          </Grid>
          <Grid item xs={5}>
            <AccountBio account={selectedAccount}  />
            <Leads account={selectedAccount}/>
            <PersonalBest />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Contacts />
          </Grid>
          <Grid item xs={4}>
            <ReportStatus />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
