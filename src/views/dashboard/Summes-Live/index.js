import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import AccountBio from './AccountBio';
import CompareLineChart from './CompareLineChart';
import Header from './Header';
import Overview from './Overview';

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
}));

const getYear = (report) => {
  let date = report['date']
  return Number(date.split('-')[0])
}

const getMonth = (report) => {
  let date = report['date']
  return Number(date.split('-')[1])
}

const strToDate = (date) => {
  return Number(date.split('-').join(''))
};

const getCurrentReport = (reports) => {
  let sorted = reports.sort(function (a, b) {
    return strToDate(b.date) - strToDate(a.date);
  })
  return sorted[0]
}

const getReportAttr = (reports, attr) => {
  if(reports.ly === undefined){
    return [{ly: [], y: []}]
  } else {
    let ly = reports.ly.map(report => {
      return report[attr]
    })
    let y = reports.y.map(report => {
      return report[attr]
    })
    return {y: y, ly: ly}
  }
}

const getReportPercent = (reports, attr) => {
  if(reports.ly === undefined){
    return [{ly: [], y: []}]
  } else {
    let ly = reports.ly.map(report => {
      return Math.round(report[attr] * 100)
    })
    let y = reports.y.map(report => {
      return Math.round(report[attr] * 100)
    })
    return {y: y, ly: ly}
  }
}
function DashboardAlternativeView() {
  const [accounts, setAccounts] = useState([])
  const [marketReports, setMarketReports] = useState([])
  const [selectedAccount, setSelectedAccount] = useState({name: '', id: -1})
  const [selectedReports, setSelectedReports] = useState([])
  const classes = useStyles();

  const fetchData = async () => {
    await fetch('http://127.0.0.1:8000/api/accounts/')
      .then(res => res.json())
      .then(res => setAccounts(res))
      .then(() => console.log('hit'))
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
      return getYear(report) === now //This should be changed to now - 1 once i fix the DB dates
    })

    let y = reports.filter(report => {
      return getYear(report) === now + 1 //This should be changed to now once i fix the DB dates
    })

    let current = getCurrentReport(reports)

    return {y: y, ly: ly, current: current}
  }

  const handleAccountSelection = (account) => {
    setSelectedAccount(account)
    setSelectedReports(coerceReports(account))
  }

  console.log(selectedReports.current)
  return (
    <Page className={classes.root} title="Dashboard Alternative">
      <Container maxWidth={false} className={classes.container}>
        <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Overview />
          </Grid>
          <Grid item lg={8} xl={9} xs={12}>
            <CompareLineChart selectedAccount={selectedAccount} reports={getReportPercent(selectedReports, 'market_share_volume')}/>
          </Grid>
          <Grid item lg={4} xl={3} xs={12}>
            <AccountBio />
          </Grid>
          <Grid item lg={8} xs={12}>
            {/*<LatestOrders />*/}
            {/*<FinancialStats selectedAccount={selectedAccount}/>*/}
          </Grid>
          <Grid item lg={4} xs={12}>
            {/*<CustomerActivity />*/}
            {/*<FinancialStats selectedAccount={selectedAccount}/>*/}
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
