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
import ContinuingEducation from './src/Components/Continuing Education Components/ContinuingEducation';
import GoalDonuts from './src/Components/Data Components/Tabler Components/GoalDonuts';

const data = require('./data/data.json')
const ppbData = require('./data/ppb.json')
const goalData = require('./data/Goals.json')
const ce_2020 = require('./data/2020 CE.json')
const ce_2021 = require('./data/2021 CE.json')

const classes = useStyles();

export default function DashboardAlternativeView(props) {
  const [accountData, setAccountData] = useState([])
  const [thisMonth, setThisMonth] = useState({})
  const [comparableMonth, setComparableMonth] = useState({})
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }])
  const [period, setPeriod] = useState('YOY')
  const [imageSrc, setImageSrc] = useState('')
  const [goals, setGoals] = useState([])
  const [ce2020, setCE2020] = useState([])
  const [ce2021, setCE2021] = useState([])

  useEffect(() => {
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : ''
    let _accountData = searchData(data, params)
    let _goalsData = searchData(goalData, params, 'Name')[0]
    let _thisMonth = _accountData.length > 0 ? _accountData[_accountData.length - 1] : null
    let _imageSrc = `./Plots/share_${searchData(data, params)[0]['Account']}.png`
    let _ce2020 = searchData(ce_2020, params)
    let _ce2021 = searchData(ce_2021, params)

    setAccountData(_accountData)
    setGoals(_goalsData)
    setThisMonth(_thisMonth)
    setPpb(ppbData)
    setImageSrc(_imageSrc)
    setCE2020(_ce2020)
    setCE2021(_ce2021)

    // Get Last Year Month or Last Month
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
                height={500}
                header={'Market Share & Office Volume by Month'}
                account={thisMonth['Account']}
              />

              <GoalDonuts
                mshare={thisMonth['YTD Market Share Volume']}
                goals={[goals['Goal'], goals['Stretch Goal']]}
                incentives={[goals['Increase'], goals['Stretch Increase']]}
              />

            </Grid>

            <Grid item spacing={3} sxs={6} id={'Marketing-Column'}>
              <UpcomingBest />
              <ContinuingEducation ce2020={ce2020} ce2021={ce2021} />
            </Grid>
          </Grid>
          <Box height={300}>

          </Box>
        </Container>
      </Page>
    </div>

  );
}

