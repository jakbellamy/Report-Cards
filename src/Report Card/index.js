import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { mainBackgroundColor, useStyles } from './styles';
import Page from '../src/components/Page';
import BoxDivider from './src/Components/_Modules/BoxDivider';
import NullBlock from './src/Components/_Modules/NullBlock';
import ReportCardHeader from './src/Components/Header/ReportCardHeader';
import GraphCard from './src/Components/_Modules/GraphCard';
import {searchData} from './functions/jsonParsers';
import MShareVolume from './src/Components/Data Components/DataPoints/MShareVolume';
import OfficeVolume from './src/Components/Data Components/DataPoints/OfficeVolume';
import UpcomingBest from './src/Components/BEST Components/upcomingBest';
import { ifExists } from './functions/conditionals';
import {firstStr, lastStr} from './functions/stringParsers';

import {
  Container,
  Grid,
  Box
} from '@material-ui/core';

const data = require('./data/data.json')
const ppbData = require('./data/ppb.json')
const classes = useStyles();

export default function DashboardAlternativeView(props) {
  const [accountData, setAccountData] = useState([])
  const [thisMonth, setThisMonth] = useState({})
  const [comparableMonth, setComparableMonth] = useState({})
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }])
  const [period, setPeriod] = useState('YOY')
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {

    //Set Data
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : ''
    let _accountData = searchData(data, params)
    let _thisMonth = _accountData.length > 0 ? _accountData[_accountData.length - 1] : null
    // let _imageSrc = `./Plots/${searchData(data, params)[0]['Account']}-report_card_plot.png`
    let _imageSrc = `./Plots/2021-02-12 ${searchData(data, params)[0]['Account']}.png`

    setAccountData(_accountData)
    setThisMonth(_thisMonth)
    setPpb(ppbData)
    setImageSrc(_imageSrc)


    // Get Last Year Month or Last Month
    console.log(_imageSrc)
    let thisMonthText = ifExists(_thisMonth['Date'], null)
    if (thisMonthText) {
      let thisMonthMonth = firstStr(thisMonthText)
      let thisMonthYear = Number(lastStr(thisMonthText))

      let monthSet = _.filter(_accountData, x => {
        let monthTxt = firstStr(x['Date'])
        return monthTxt === thisMonthMonth
      })

      let lastYearDate = thisMonthMonth + ' ' + (thisMonthYear - 1).toString()
      let lastYear = _.find(monthSet, {'Date': lastYearDate})

      if (lastYear) {
        setPeriod('YOY')
        setComparableMonth(lastYear)
      } else if (_accountData[_accountData.length - 2]) {
        setPeriod('MOM')
        setComparableMonth(_accountData[_accountData.length - 2])
      } else {
        setPeriod(null)
      }
    }

  }, []);

  let periodCaption
  if (period==='YOY' && comparableMonth) {
    periodCaption = comparableMonth['Date']
  } else if (period==='MOM' && comparableMonth) {
    periodCaption = comparableMonth['Date']
  } else {
    periodCaption = ''
  }


  return (
    <div style={{backgroundColor: mainBackgroundColor}}>
      <Page className={classes.root} title="Auto Report Card">
        <Container maxWidth={false} className={classes.container} id={'content-container'}>

          <NullBlock />
          <ReportCardHeader accountData={accountData} />

          <BoxDivider
            paddingTop={3}
            paddingBottom={3}
          />

          <Grid container spacing={3} id={'Report-Card-Content'}>
            <Grid item xs={6} id={'Data-Column'}>
              <Grid container spacing={2}>
                <MShareVolume
                  thisMonth={thisMonth}
                  comparableMonth={comparableMonth}
                  period={period}
                />
                <OfficeVolume
                  thisMonth={thisMonth}
                  comparableMonth={comparableMonth}
                  period={period}
                />
              </Grid>


              <GraphCard
                imageSrc={imageSrc}
                height={420}
                header={'Market Share & Office Volume by Month'}/>
            </Grid>

            <Grid item xs={6} id={'Marketing-Column'}>
              <UpcomingBest />
            </Grid>
          </Grid>
          <Box height={650}>

          </Box>
        </Container>
      </Page>
    </div>

  );
}

