import React, { useEffect, useState } from 'react';
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

const getPeriod = (latest) => {
  latest = latest.split('-')[0] + latest.split('-')[1]
  let [month, date, year] = ( new Date() ).toLocaleDateString().split("/")
  month = Number(date) < 15 ? Number(month) - 1 : month
  month = month.toString().length === 1 ? '0' + month : month
  let dint = year + month
  return latest === dint
}


let shell = {
  office_volume: 0,
  supreme_volume: 0,
  office_units: 0,
  supreme_units: 0,
  market_share_volume: 0,
  market_share_units: 0,
  id: 0,
  comment: ''
}
const year_shell = {1: shell, 2: shell, 3: shell, 4: shell, 5: shell, 6: shell, 7: shell, 8: shell, 9: shell, 10: shell, 11: shell, 12: shell}

function DashboardAlternativeView() {
  const user = useSelector((state) => state.account);
  const [accounts, setAccounts] = useState([])
  const [rawAccounts, setRawAccounts] = useState([])
  const [selectedAccount, setSelectedAccount] = useState({name: 'Choose Account', id: -1})
  const [isCurrent, setIsCurrent] = useState(false)
  const [education, setEducation] = useState([])
  const [filteredEducation, setFilteredEducation] = useState({y: [], ly: []})
  const [lyReports, setLyReports] = useState([])
  const [ytdReports, setYtdReports] = useState([])
  const [leadReports, setLeadReports] = useState([])
  const [filteredLeadReports, setFilteredLeadReports] = useState([])
  const [ly, setLy] = useState(year_shell)
  const [ytd, setYtd] = useState(year_shell)
  const [current, setCurrent] = useState(shell)
  const [stats, setStats] = useState({ly: [], y: [], avg: []})
  const [stats1, setStats1] = useState({ly: [], y: [], avg: []})
  const [stats2, setStats2] = useState([])
  const [stats2Labels, setStats2Labels] = useState([])
  const [stats2Company, setStats2Company] = useState([])
  const [stats2Raw, setStats2Raw] = useState([])
  const [filterToggle, setFilterToggle] = useState(false)
  const classes = useStyles();

  const fetchData = async () => {
    await fetch('http://0.0.0.0:2500/account_data')
      .then(res => res.json())
      .then(res => console.log(res))
  }

  fetchData()
  return (
    <Page className={classes.root} title="Sales Manager Dashboard">
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          {/*<Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection} filterToggle={filterToggle} handleToggle={handleFilterToggle} admin={user.user.role === 'admin'} current={current}/>*/}
          <Grid item xs={7} spacing={3}>
            {/*<DataOverview thisYear={ytd} lastYear={ly} thisMonth={current} key={Math.floor(Math.random() * 101)}/>*/}
            {/*<DataChart stats={stats} stats1={stats1} current={current} setCurrent={setCurrent} stats2={stats2} stats2Labels={stats2Labels} stats2Company={stats2Company}/>*/}
            {/*<PersonalBest account={selectedAccount} />*/}
          </Grid>
          <Grid item xs={5}>
            {/*<AccountBio account={selectedAccount}  />*/}
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
