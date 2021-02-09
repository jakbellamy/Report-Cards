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
import {accounts, data, filterForAccount, searchData} from './parsing';
import {fetchSupremeVault} from './functions/scrapers';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ReportCardGraph from './src/DataChart/ReportCardGraph';
const ppbData = require('./ppb.json')

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

let today = new Date()

function DashboardAlternativeView(props) {
  // const user = useSelector((state) => state.account);
  // const [selectedAccount, setSelectedAccount] = useState(null)
  const [accountData, setAccountData] = useState([])
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }])
  const [imageSrc, setImageSrc] = useState('')
  const classes = useStyles();


  useEffect(() => {
    // let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    // fetch(proxyUrl + 'https://eyxiglvod6.execute-api.us-east-2.amazonaws.com/scrape_vault')
    //   .then(res => res.json())
    //   .then(res => setPpb(res))
    setPpb(ppbData)
  }, [])

  let companyTotals = []
  useEffect(() => {
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : ''
    setAccountData(searchData(data, params))
    setImageSrc(`./Plots/${searchData(data, params)[0]['Account']}-report_card_plot.png`)
  }, []);

  return (
    <Page className={classes.root} title="Auto Report Card">
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}  />

        </Grid>
        <Grid container spacing={3}>

            {/*<Grid item xs={1}  />*/}

            <Grid item xs={7}>
              <img src={'https://supremebest.com/wp-content/uploads/2020/02/supreme_logo.svg'} width={'45%'} />
            </Grid>

            <Grid item xs={5}>
              <div style={{paddingTop: 20}}>
                <Typography variant="h1">{accountData[0] ? accountData[0]['Account'] : ''}</Typography>
                <Typography variant="subtitle1">{accountData[0] ? `Date: ${today.toLocaleDateString()}` : ''}</Typography>
              </div>
            </Grid>

            {/*<Grid item xs={1}  />*/}

        </Grid>

        <Grid container spacing={3}>
          {/*<Grid item xs={1}  />*/}
          <Grid item xs={7}>
            <DataOverview
              accountData={accountData}
              thisMonth={accountData.length > 0 ? accountData[accountData.length - 1] : null}
              key={Math.floor(Math.random() * 101)}
            />
            <Card>
              <center>
                <img src={imageSrc} width={'auto'} height={430}/>
              </center>
            </Card>
            <PersonalBest ppb={ppb}/>
          </Grid>
          <Grid item xs={5}>
            <AccountBio account={accountData.length > 0 ? accountData[accountData.length - 1] : null}/>
            <Leads />
            <Education />
          </Grid>
          {/*<Grid item xs={1}  />*/}

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
