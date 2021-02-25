import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { mainBackgroundColor, useStyles } from './styles';
import Page from '../src/components/Page';
import BoxDivider from './src/Components/_Modules/BoxDivider';
import NullBlock from './src/Components/_Modules/NullBlock';
import ReportCardHeader from './src/Components/Header/ReportCardHeader';
import GraphCard from './src/Components/_Modules/GraphCard';
import { searchData } from './functions/jsonParsers';
import MShareVolume from './src/Components/Data Components/DataBox/DataPoints/MShareVolume';
import OfficeVolume from './src/Components/Data Components/DataBox/DataPoints/OfficeVolume';
import UpcomingBest from './src/Components/Inustry Standards/upcomingBest';
import { ifExists } from './functions/conditionals';
import { firstStr, lastStr } from './functions/stringParsers';

import {
  Container,
  Grid,
  Box,
  CardHeader
} from '@material-ui/core';
import ContinuingEducation from './src/Components/Continuing Education/ContinuingEducation_Deprecated';
import GoalDonuts from './src/Components/Data Components/Tabler Components/GoalDonuts';
import CSAT from './src/Components/Inustry Standards/csat';
import CenteredImage from './src/Components/_Modules/centeredImage';
import Card from '@material-ui/core/Card';
import CloseComparison from './src/Components/Inustry Standards/CloseComparison';
import ExperienceGrid from './src/Components/Experience';
import PnPB from './src/Components/PPB';
import DataTable from './src/Components/Data Components/Data Table';
import RetroData from './src/Components/Data Components/DataBox/DataPoints/RetroData';

const data = require('./data/data.json');
const ppbData = require('./data/ppb.json');
const goalData = require('./data/Goals.json');
const ce_2020 = require('./data/2020 CE.json');
const ce_2021 = require('./data/2021 CE.json');

const classes = useStyles();

export default function ReportCard(props) {
  const [accountData, setAccountData] = useState([]);
  const [thisMonth, setThisMonth] = useState({});
  const [comparableMonth, setComparableMonth] = useState({});
  const [ppb, setPpb] = useState([{ 'Title': '', 'Date': '' }]);
  const [period, setPeriod] = useState('YOY');
  const [imageSrc, setImageSrc] = useState('');
  const [goals, setGoals] = useState([]);
  const [ce2020, setCE2020] = useState([]);
  const [ce2021, setCE2021] = useState([]);

  useEffect(() => {
    let params = props.match.params[0] ? props.match.params[0].split('/')[1] : '';
    let _accountData = searchData(data, params);
    let _goalsData = searchData(goalData, params, 'Name')[0];
    let _thisMonth = _accountData.length > 0 ? _accountData[_accountData.length - 1] : null;
    let _imageSrc = `./Plots/share_${searchData(data, params)[0]['Account']}.svg`;
    let _ce2020 = searchData(ce_2020, params);
    let _ce2021 = searchData(ce_2021, params);

    setAccountData(_accountData);
    setGoals(_goalsData);
    setThisMonth(_thisMonth);
    setPpb(ppbData);
    setImageSrc(_imageSrc);
    setCE2020(_ce2020);
    setCE2021(_ce2021);

    // Get Last Year Month or Last Month
    let thisMonthText = ifExists(_thisMonth['Date'], null);
    if (thisMonthText) {
      let thisMonthMonth = firstStr(thisMonthText);
      let thisMonthYear = Number(lastStr(thisMonthText));

      let monthSet = _.filter(_accountData, x => {
        let monthTxt = firstStr(x['Date']);
        return monthTxt === thisMonthMonth;
      });

      let lastYearDate = thisMonthMonth + ' ' + (thisMonthYear - 1).toString();
      let lastYear = _.find(monthSet, { 'Date': lastYearDate });

      if (lastYear && lastYear['Office Volume'] > 0) {
        setPeriod('YOY');
        setComparableMonth(lastYear);
      } else if (_accountData[_accountData.length - 2]) {
        setPeriod('MOM');
        setComparableMonth(_accountData[_accountData.length - 2]);
      } else {
        setPeriod(null);
      }
    }

  }, []);

  return (
    <div style={{ backgroundColor: mainBackgroundColor }}>
      <Page className="report-card">
      <ReportCardHeader data={thisMonth}/>
        <Box marginLeft={3}>
        <Container maxWidth={false} className={classes.container} id={'content-container'} >

          <NullBlock/>

          <BoxDivider
            paddingTop={3}
            paddingBottom={3}
          />

          <Grid container spacing={3} id={'Report-Card-Content'} alignItems={'flex-start'} justify={'space-evenly'}>
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


              <GoalDonuts
                mshare={thisMonth['YTD Market Share Volume']}
                goals={[goals['Goal'], goals['Stretch Goal']]}
                incentives={[goals['Increase'], goals['Stretch Increase']]}
              />
              <Box marginTop={2}>
                <RetroData data={accountData}/>
              </Box>

              <GraphCard
                imageSrc={imageSrc}
                height={550}
                header={'Market Share & Office Volume by Month'}
                account={thisMonth['Account']}
              />


              <Box marginTop={3} marginBottom={3}>
                <ContinuingEducation ce2020={ce2020} ce2021={ce2021}/>
              </Box>

            </Grid>

            <Grid item id={'Marketing-Column'} alignItems={'flex-start'}>
              <CenteredImage src={'./images/Credit Essentials.jpg'} height={400}/>
              <Box paddingTop={'2%'}>
                <ExperienceGrid />
              </Box>
              <Box paddingTop={'2%'} align={'center'}>
                <CenteredImage src={'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/153168374_3681749721920486_5624809215965204231_o.jpg?_nc_cat=105&ccb=3&_nc_sid=340051&_nc_ohc=uuz-wa4KUzkAX_pZ1SV&_nc_ht=scontent-iad3-1.xx&oh=f0aea9bad0c5b72e2387812b068f8179&oe=605DEB57'}
                               height={'420'}/>
              </Box>
              <PnPB />
            </Grid>
          </Grid>
          <NullBlock/>
        </Container>
        </Box>
      </Page>
    </div>

  );
}

