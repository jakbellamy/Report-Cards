//----------------------------------------------------------
//Libraries
import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import _ from 'lodash';

//----------------------------------------------------------
//Modules
import Page from 'src/components/Page';
import { DataBox } from './src/Modules/DataBox/DataBox';
import BoxDivider from './src/Modules/BoxDivider';
import NullBlock from './src/Modules/NullBlock';

//----------------------------------------------------------
//Components
import ReportCardHeader from './src/ReportCardHeader';
import GraphCard from './src/Modules/GraphCard';

//----------------------------------------------------------
//Functions
import { reportCardIndexStyles } from './styles';
import {searchData} from './parsing';
import MShareVolume from './src/Components/DataPoints/MShareVolume';
import { doIfExists, ifExists } from '../../../utilities/functions/conditionals';
import diff from 'redux-logger/src/diff';
import { asUSD } from './functions/methods';
import OfficeVolume from './src/Components/DataPoints/OfficeVolume';

//----------------------------------------------------------
//Constants
const data = require('./data.json')
const ppbData = require('./ppb.json')
const useStyles = reportCardIndexStyles()

//----------------------------------------------------------
//Lambda Functions
const firstStr = x => x.split(' ')[0]
const lastStr = x => x.split(' ')[x.split(' ').length - 1]
const compData = (key, compareSet, originalSet) => ((compareSet[key] - originalSet[key]) /originalSet[key]) * 100


//----------------------------------------------------------
//Functions


//----------------------------------------------------------!
//                          HOOK
//----------------------------------------------------------!


export default function DashboardAlternativeView(props) {
  const [accountData, setAccountData] = useState([])
  const [thisMonth, setThisMonth] = useState({})
  const [comparableMonth, setComparableMonth] = useState({})
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }])
  const [period, setPeriod] = useState('YOY')
  const [imageSrc, setImageSrc] = useState('')
  const classes = useStyles();

  useEffect(() => {

    //Set Data
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : ''
    let _accountData = searchData(data, params)
    let _thisMonth = _accountData.length > 0 ? _accountData[_accountData.length - 1] : null
    let _imageSrc = `./Plots/${searchData(data, params)[0]['Account']}-report_card_plot.png`

    setAccountData(_accountData)
    setThisMonth(_thisMonth)
    setPpb(ppbData)
    setImageSrc(_imageSrc)


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

  let periodCaption
  if (period==='YOY' && comparableMonth) {
    periodCaption = comparableMonth['Date']
  } else if (period==='MOM' && comparableMonth) {
    periodCaption = comparableMonth['Date']
  } else {
    periodCaption = ''
  }


  return (
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


            <GraphCard imageSrc={imageSrc} height={430} />
          </Grid>

          <Grid item xs={6} id={'Marketing-Column'}>

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export {compData}
