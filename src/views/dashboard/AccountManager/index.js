//----------------------------------------------------------
//Libraries
import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';

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

//----------------------------------------------------------
//Constants
const data = require('./data.json')
const ppbData = require('./ppb.json')
const useStyles = reportCardIndexStyles()


//----------------------------------------------------------!
//                          HOOK
//----------------------------------------------------------!


export default function DashboardAlternativeView(props) {
  const [accountData, setAccountData] = useState([])
  const [thisMonth, setThisMonth] = useState({})
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }])
  const [imageSrc, setImageSrc] = useState('')
  const classes = useStyles();

  useEffect(() => {
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : ''
    let _accountData = searchData(data, params)
    let _thisMonth = _accountData.length > 0 ? _accountData[_accountData.length - 1] : null
    let _imageSrc = `./Plots/${searchData(data, params)[0]['Account']}-report_card_plot.png`

    setAccountData(_accountData)
    setThisMonth(_thisMonth)
    setPpb(ppbData)
    setImageSrc(_imageSrc)
  }, []);

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
            <DataBox
              title="Sales Today"
              value="1.500"
              differenceValue="+20%"
              caption=" Since last week"
            />

            <GraphCard imageSrc={imageSrc} height={430} />
          </Grid>

          <Grid item xs={6} id={'Marketing-Column'}>

          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
