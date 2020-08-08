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
  const [isSelected, setIsSelected] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [lyReports, setLyReports] = useState([])
  const [ytdReports, setYtdReports] = useState([])
  const [selectedAccount, setSelectedAccount] = useState({name: '', id: -1})
  const [selectedReports, setSelectedReports] = useState([{current: shell, ly: [], y: [], mkt_vol: {ly: [], y: []}, mkt_units:{ly: [], y: []}}])
  const [graphToggle, setGraphToggle] = useState('market_share_volume')
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


  const coerceReports = (account) => {

    let y = ytdReports.filter(report => report.account_id === account.id)
    let ly = lyReports.filter(report => report.account_id === account.id)
    console.log(y)

    setStats({
      y: y.map(report => report[graphToggle]),
      ly: ly.map(report => report[graphToggle])
    })

    let current = y.sort((a, b) => b.date - a.date)[0]
    return {
      y: y,
      ly: ly,
      current: current,
      oy: ly.filter(rep => new Date(rep.date).getMonth() == new Date(current.date).getMonth())
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
            <Overview report={selectedReports.current} ly={selectedReports.oy}/>
          </Grid>
          <Grid item lg={8} xl={9} xs={12}>
            <CompareLineChart selectedAccount={selectedAccount} reports={stats}/>
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
