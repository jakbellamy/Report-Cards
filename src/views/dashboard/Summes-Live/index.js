import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import AccountBio from './AccountBio';
import FinancialStats from './MktShareGraph';
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

function DashboardAlternativeView() {
  const [accounts, setAccounts] = useState([])
  const [marketReports, setMarketReports] = useState([])
  const [selectedAccount, setSelectedAccount] = useState({'name': 'Choose Account'})
  const [selectedReports, setSelectedReports] = useState([])
  const classes = useStyles();

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    await fetch('http://127.0.0.1:8000/api/accounts/')
      .then(res => res.json())
      .then(res => setAccounts(res))
      .then(() => console.log('hit'))
    await fetch("http://127.0.0.1:8000/api/market-share-reports/")
      .then(res => res.json())
      .then(res => setMarketReports(res))
  }

  const coerceReports = (account) => {
    return marketReports.filter(report => {
      report.account = account.id
    })
  }

  const handleAccountSelection = (account) => {
    setSelectedAccount(account)
    setSelectedReports(coerceReports(account))
  }
  console.log(selectedAccount)
  console.log(selectedReports)
  return (
    <Page className={classes.root} title="Dashboard Alternative">
      <Container maxWidth={false} className={classes.container}>
        <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection()} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Overview />
          </Grid>
          <Grid item lg={8} xl={9} xs={12}>
            <FinancialStats selectedAccount={selectedAccount}/>
          </Grid>
          <Grid item lg={4} xl={3} xs={12}>
            <AccountBio />
          </Grid>
          <Grid item lg={8} xs={12}>
            {/*<LatestOrders />*/}
          </Grid>
          <Grid item lg={4} xs={12}>
            {/*<CustomerActivity />*/}
          </Grid>
          <Grid item lg={8} xs={12}>
            {/*<MostProfitableProducts />*/}
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
