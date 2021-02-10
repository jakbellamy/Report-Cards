import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import DataOverview from './src/DataOverview/DataOverview';
import {data, searchData} from './parsing';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import GraphCard from './src/Modules/GraphCard';
import NullBlock from './src/Modules/NullBlock';
import ReportCardHeader from './src/ReportCardHeader';
import { reportCardIndexStyles } from './styles';
import BoxDivider from './src/Modules/BoxDivider';
const ppbData = require('./ppb.json')

const useStyles = reportCardIndexStyles()

export default function DashboardAlternativeView(props) {
  const [accountData, setAccountData] = useState([])
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }])
  const [imageSrc, setImageSrc] = useState('')
  const classes = useStyles();

  useEffect(() => {
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : ''
    setAccountData(searchData(data, params))
    setPpb(ppbData)
    setImageSrc(`./Plots/${searchData(data, params)[0]['Account']}-report_card_plot.png`)
  }, []);

  return (
    <Page className={classes.root} title="Auto Report Card">
      <Container maxWidth={false} className={classes.container}>
        <NullBlock />
        <ReportCardHeader accountData={accountData} />
        <BoxDivider paddingTop={2} paddingBottom={3} />


        <Grid container spacing={3}>
          <Grid item xs={7}>
            <DataOverview
              accountData={accountData}
              thisMonth={accountData.length > 0 ? accountData[accountData.length - 1] : null}
              key={Math.floor(Math.random() * 101)}
            />
            <GraphCard imageSrc={imageSrc} height={430} />
          </Grid>
          <Grid item xs={5}>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
