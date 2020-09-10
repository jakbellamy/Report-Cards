import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import AccountBio from './src/AccountBio/Bio';
import CompareLineChart from './src/MarketChart';
import Header from './src/Header/Header';
import Overview from './src/Overview/index';
import Leads from './src/Leads/Leads'
import PersonalBest from './src/PersonalBest/PersonalBest'
import Education from './src/ContinuingEducation/Education'
import Contacts from './src/Contacts/Contacts'
import ReportStatus from './src/ReportStatus/ReportStatus';
import Volume from './src/Overview/volume';

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
  month = month.toString().length == 1 ? '0' + month : month
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
  const [graphType, setGraphType] = useState('market_share_volume')
  const [stats, setStats] = useState({ly: [], y: [], avg: []})
  const [stats1, setStats1] = useState({ly: [], y: [], avg: []})
  const [filterToggle, setFilterToggle] = useState(false)
  const classes = useStyles();

  const fetchData = async () => {
    await fetch('https://djsupreme.herokuapp.com/api/accounts/')
      .then(res => res.json())
      .then(res => res.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        }))
      .then(res => handleAccountSet(res))
    await fetch("https://djsupreme.herokuapp.com/data/ly")
      .then(res => res.json())
      .then(res => setLyReports(res))
    await fetch("https://djsupreme.herokuapp.com/data/y")
      .then(res => res.json())
      .then(res => setYtdReports(res))
    await fetch("https://djsupreme.herokuapp.com/api/educations/")
      .then(res => res.json())
      .then(res => setEducation(res))
    await fetch("https://djsupreme.herokuapp.com/api/lead-reports/")
      .then(res => res.json())
      .then(res => setLeadReports(res))
  }

  useEffect(() => {
    fetchData()
  }, []);

  const handleAccountSet = (accounts, toggle='pass') => {
    setRawAccounts(accounts)
    if (user.user.role === 'smgr' && toggle != true) {
      accounts = accounts.filter( account => user.user.accounts.filter( id => id === account.id ).length > 0)
    }
    setAccounts(accounts)
  }

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle)
    handleAccountSet(rawAccounts, !filterToggle)
  }

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
    if(yf.length > 0){
      setCurrent(yf.sort((a, b) => new Date(b.date) - new Date(a.date))[0])
      setIsCurrent(getPeriod(yf.sort((a, b) => b.date - a.date)[0]['date']))
    } else {
      setCurrent(shell)
      setIsCurrent(false)
    }
    setLy(buildLy(account, lyf))
    setYtd(buildYtd(account, yf))
    setStats(buildTableData(buildLy(account, lyf), buildYtd(account, yf), buildLy(account, avgf), 'market_share_volume'))
    setStats1(buildTableData(buildLy(account, lyf), buildYtd(account, yf), buildLy(account, avgf), 'market_share_units'))
  }

  const filterEducation = (account) => {
    let edu = education.filter(report => report.account === account.id)
    let year = education.sort((a, b) => a.date - b.date)[0]['date'].split('-')[0]
    let eduy = edu.filter(report => report.date >= `${year}-00-00`)
    let eduly = edu.filter(report => `${year - 1}-00-00` <= report.date <= `${year}-00-00`)
    setFilteredEducation({y: eduy, ly: eduly})
  }

  const filterLeads = (account) => {
    let leads = leadReports.filter(report => report.account === account.id)
    setFilteredLeadReports(leads)
  }

  const handleAccountSelection = (account) => {
    setSelectedAccount(account)
    coerceReports(account)
    filterEducation(account)
    filterLeads(account)
  }

  return (
    <Page className={classes.root} title="Sales Manager Dashboard">
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection} filterToggle={filterToggle} handleToggle={handleFilterToggle} admin={user.user.role === 'admin'}/>
          <Grid item xs={7} spacing={3}>
            <Overview thisYear={ytd} lastYear={ly} thisMonth={current} key={Math.floor(Math.random() * 101)}/>
            <CompareLineChart stats={stats} stats1={stats1} graphType={graphType} setGraphType={setGraphType} current={current} setCurrent={setCurrent}/>
            <PersonalBest account={selectedAccount} />
          </Grid>
          <Grid item xs={5}>
            <AccountBio account={selectedAccount}  />
            <Leads account={selectedAccount} leads={filteredLeadReports}/>
            <Education account={selectedAccount} events={filteredEducation}/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Contacts account={selectedAccount} />
          </Grid>
          <Grid item xs={2}>
            <ReportStatus status={isCurrent}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
