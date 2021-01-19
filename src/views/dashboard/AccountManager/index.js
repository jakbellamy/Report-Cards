import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import { useSelector } from 'react-redux';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import AccountBio from './src/InfoComponents/AccountBio/Bio';
import DataChart from './src/DataChart/DataCharts';
import Header from './src/Header/Header';
import DataOverview from './src/DataOverview/DataOverview';
import Leads from './src/InfoComponents/Leads/Leads'
import PersonalBest from './src/InfoComponents/PersonalBest/PersonalBest'
import Education from './src/InfoComponents/ContinuingEducation/Education'
import Contacts from './src/InfoComponents/Contacts/Contacts'
import LoanOfficers from './src/InfoComponents/LoanOfficers/LoanOfficers';

import {accounts, data, filterForAccount} from './parsing';

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

const getYear = date => date.split('-')[0]
const filterYear = (data, year) => _.filter(data, x => getYear(x['Date']) === year)

function DashboardAlternativeView() {
  const user = useSelector((state) => state.account);
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [accountData, setAccountData] = useState([])
  const classes = useStyles();

  useEffect(() => {
    // handleAccountSelection(_.sample(accounts))
  }, []);

  const handleAccountSelection = (name) => {
    let sel = data.filter(rec => rec['Account'] === name)
    setSelectedAccount(sel)
  }

  const companyTotals = filterForAccount(data, 'Company Totals')

  return (
    <Page className={classes.root} title="Sales Manager Dashboard">
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={setSelectedAccount} setAccountData={setAccountData} data={data} admin={user.user.role === 'admin'}/>
          <Grid item xs={7} spacing={3}>
            <DataOverview
              accountData={accountData}
              thisMonth={accountData.length > 0 ? accountData[accountData.length - 1] : null}
              key={Math.floor(Math.random() * 101)}
            />
            <DataChart accountData={accountData} comanyTotals={companyTotals}/>
            <PersonalBest account={accountData.length > 0 ? accountData[accountData.length - 1] : null} />
          </Grid>
          <Grid item xs={5}>
            <AccountBio account={accountData.length > 0 ? accountData[accountData.length - 1] : null}  />
            {/*<Leads account={selectedAccount} leads={filteredLeadReports}/>*/}
            {/*<Education account={selectedAccount} events={filteredEducation}/>*/}
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            {/*<Contacts account={selectedAccount} />*/}
          </Grid>
          <Grid item xs={2}>
            {/*<LoanOfficers account={selectedAccount}/>*/}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
