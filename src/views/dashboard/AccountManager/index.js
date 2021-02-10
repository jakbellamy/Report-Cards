import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import DataOverview from './src/DataOverview/DataOverview';
import {accounts, data, filterForAccount, searchData} from './parsing';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import GraphCard from './src/Modules/GraphCard';
import NullBlock from './src/Modules/NullBlock';
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
  const [accountData, setAccountData] = useState([])
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }])
  const [imageSrc, setImageSrc] = useState('')
  const classes = useStyles();


  useEffect(() => {
    setPpb(ppbData)
  }, [])

  useEffect(() => {
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : ''
    setAccountData(searchData(data, params))
    setImageSrc(`./Plots/${searchData(data, params)[0]['Account']}-report_card_plot.png`)
  }, []);

  return (
    <Page className={classes.root} title="Auto Report Card">
      <Container maxWidth={false} className={classes.container}>
        <NullBlock />
        <Grid container spacing={3}>
            <Grid item xs={7}>
              <div style={{paddingTop: 20}}>
                <Typography variant="h1">{accountData[0] ? accountData[0]['Account'] : ''}</Typography>
                <Typography variant="subtitle1">{accountData[0] ? `Date: ${today.toLocaleDateString()}` : ''}</Typography>
              </div>
            </Grid>

            <Grid item xs={5}>
              <center><img src={'https://supremebest.com/wp-content/uploads/2020/02/supreme_logo.svg'} width={'80%'} /></center>
            </Grid>
        </Grid>

        <Box
          paddingTop={1}
          paddingBottom={3}
        >
          <Divider/>
        </Box>


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

export default DashboardAlternativeView;
