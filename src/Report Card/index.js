import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { mainBackgroundColor } from './styles';
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
  CardHeader, makeStyles
} from '@material-ui/core';
import ContinuingEducation from './src/Components/Continuing Education/ContinuingEducation';
import GoalDonuts from './src/Components/Data Components/Tabler Components/GoalDonuts';
import CSAT from './src/Components/Inustry Standards/csat';
import CenteredImage from './src/Components/_Modules/centeredImage';
import Card from '@material-ui/core/Card';
import CloseComparison from './src/Components/Inustry Standards/CloseComparison';
import ExperienceGrid from './src/Components/Experience';
import PnPB from './src/Components/PPB';
import DataTable from './src/Components/Data Components/Data Table';
import RetroData from './src/Components/Data Components/DataBox/DataPoints/RetroData';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const data = require('./data/data.json');
const ppbData = require('./data/ppb.json');
const goalData = require('./data/Goals.json');
const ce_2020 = require('./data/2020 CE.json');
const ce_2021 = require('./data/2021 CE.json');

const useStyles = () => {
  return makeStyles((theme) => ({
    text: {
      flexWrap: 'wrap',
      maxWidth: '240px',
      margin: '5 -10 5 -5',

    },
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
    },
  }))
}

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

  let classes = useStyles();

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

  const ce_adverts = [
      ['./CE/Social Media.svg', 'Social Media', "We've partnered with D.S. Murphy & Associates to bring you 5 distinct courses on Appraisals."],
      ['./CE/Introduction to Condominiums.svg', 'Intro to Condominiums', "Our Condo class was designed to help you better understand all of the intricacies of this transaction."],
      ['./CE/Fundamentals of Credit.svg', 'Fundamentals of Credit', "Our credit class removes the mystery surrounding credit scores, leaving you better equipped to help your buyer qualify for the home of their dreams."],
      ['./CE/Market Like a Rockstar.svg', 'Market Like a Rockstar', "Grammy-Award winner Tai Anderson will teach you how to Market Like A Rockstar and take advantage of Social Media to grow your audience."],
      ['./CE/cmas.svg', 'CMAs'],
      ['./CE/Appraisals Field Trip.svg', 'Appraisals Field Trip'],
      ['./CE/Mastering Appraisals.svg', 'Mastering Appraisals'],
      ['./CE/Understanding Home Inspections.svg', 'Home Inspections'],
      ['./CE/Understanding Values.svg', 'Understanding Values']
  ]

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
                mshare={thisMonth['Goal to Date']}
                goals={[thisMonth['Goal'], thisMonth['Stretch']]}
                incentives={[goals['Increase'], goals['Stretch Increase']]}
              />
              <Box marginTop={2}>
                <RetroData data={accountData}/>
              </Box>

              <GraphCard
                imageSrc={imageSrc}
                height={620}
                header={'Market Share & Office Volume by Month'}
                account={thisMonth['Account']}
              />


              <Box marginTop={3} marginBottom={3}>
                {/*<ContinuingEducation ce2020={ce2020} ce2021={ce2021}/>*/}
              </Box>

            </Grid>

            <Grid item id={'Marketing-Column'} alignItems={'flex-start'} >
              <CenteredImage src={'./images/Credit Essentials.jpg'} height={400}/>
              <Box paddingTop={'2%'}>
                <ExperienceGrid />
              </Box>
              <Box paddingTop={'2%'} align={'center'}>
                <CenteredImage src={'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/153168374_3681749721920486_5624809215965204231_o.jpg?_nc_cat=105&ccb=3&_nc_sid=340051&_nc_ohc=uuz-wa4KUzkAX_pZ1SV&_nc_ht=scontent-iad3-1.xx&oh=f0aea9bad0c5b72e2387812b068f8179&oe=605DEB57'}
                               height={'420'}/>
              </Box>
            </Grid>


          </Grid>
            {/*<Card>*/}


          <Grid item xs={12}>
                <Box >
                  <Card>
                    <Box padding={3}>
                      <Typography variant={"h3"} align={'center'} >
                        Continuing Education
                      </Typography>
                    </Box>
                    <Box height={250} >
                      <ContinuingEducation ce2020={ce2020} ce2021={ce2021}/>
                    </Box>

                    <Grid container spacing={3} padding={1} justify={'space-evenly'}>
                    {ce_adverts.map(item => {
                      return (
                        <Grid item xs={12/9} sm={0}>
                          <Card elevation={0}  >
                            <Box  width={'auto'} height={150}
                                  marginTop={2} paddingBottom={1}
                            >
                              <Card height={30}>
                                <Typography align={'center'} >{item[1]}</Typography>
                              </Card>
                              <Box align={'center'}  marginTop={1}>
                                <embed src={item[0]} style={{borderRadius: '100%'}} height={90}/>

                              </Box>
                            </Box>
                            {/*</Box>*/}
                          </Card>
                        </Grid>
                      )
                    })}

                  </Grid>
                  </Card>

                </Box>
              </Grid>



          <NullBlock/>
        </Container>
        </Box>
      </Page>
    </div>

  );
}

