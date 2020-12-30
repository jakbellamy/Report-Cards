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
const data = require('./data.json')

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
    await fetch("https://djsupreme.herokuapp.com/data/ot")
      .then(res => res.json())
      .then(res => handleStats2(res))
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
    if (user.user.role === 'smgr' && toggle !== true) {
      accounts = accounts.filter( account => user.user.accounts.filter( id => id === account.id ).length > 0)
    }
    setAccounts(accounts)
  }

  const handleFilterToggle = () => {
    setFilterToggle(!filterToggle)
    handleAccountSet(rawAccounts, !filterToggle)
  }

  const handleStats2 = (res) => {
    setStats2Raw(res)
    filterStats2Company(res)
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
    let yf = ytdReports.filter(report => report['account_id'] === account.id)
    let lyf = lyReports.filter(report => report['account_id'] === account.id)
    let avgf = lyReports.filter(report => report['account_id'] === 25)
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
    filterStats2(account)
  }

  const filterEducation = (account) => {
    let edu = []; let year = []
    if(education.length > 0){
      edu = education.filter(report => report.account === account.id)
      year = education.sort((a, b) => a.date - b.date)[0]['date'].split('-')[0]
    }
    let eduy = edu.filter(report => report.date >= `${year}-00-00`)
    let eduly = edu.filter(report => `${year - 1}-00-00` <= report.date <= `${year}-00-00`)
    setFilteredEducation({y: eduy, ly: eduly})
  }

  const filterStats2Company = (reports) => {
    let stats = reports.filter(report => report['account_id'] === 25)
    if(stats.length > 0){
      setStats2Company(stats.sort((a, b) => new Date(a.date) - new Date(b.date)))
    } else {
      setStats2Company([])
    }
  }


  const filterStats2 = (account) => {
    let stats = stats2Raw.filter(report => report['account_id'] === account.id)
    if(stats.length > 0){
      setStats2(stats.sort((a, b) => new Date(a.date) - new Date(b.date)))
      let statLabels = stats.map(record => {
        let date = new Date(record.date)
        date = new Date(date.setDate(date.getDate()+1))
        let year = date.getFullYear().toString().split('')
        year = year[2] + year[3]
        return `${date.getMonth()+1}/${year}`
      })
      setStats2Labels(statLabels)
    } else {
      setStats2([])
      setStats2Labels([])
    }
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
          <Header accounts={accounts} selectedAccount={selectedAccount} setSelectedAccount={handleAccountSelection} filterToggle={filterToggle} handleToggle={handleFilterToggle} admin={user.user.role === 'admin'} current={current}/>
          <Grid item xs={7} spacing={3}>
            <DataOverview thisYear={ytd} lastYear={ly} thisMonth={current} key={Math.floor(Math.random() * 101)}/>
            <DataChart stats={stats} stats1={stats1} current={current} setCurrent={setCurrent} stats2={stats2} stats2Labels={stats2Labels} stats2Company={stats2Company}/>
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
            <LoanOfficers account={selectedAccount}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardAlternativeView;
