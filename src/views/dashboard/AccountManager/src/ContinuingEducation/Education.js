import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Title from '../_Components/Title'
import SimpleList from '../_Components/SimpleList'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TopicsList from './TopicsList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    height: 685
  },
}));

const displayEvents = (events) => {
  if(events.length === 0){
    return ''
  } else {
    events = [...new Set(events.map(event => event['type']))]
    if(events.length === 1){
      return events[0]
    } else if(events.length === 2) {
      return `${events[0]} and ${events[1]}`
    } else {
      let res = `${events.shift()}`
      let i = 0
      while (i < events.length - 1) {
        res += `, ${events[i]}`
        i += 1
      }
      return res + ` and ${events[events.length - 1]}`
    }
  }
}

const getTopics = (events) => {
  return [...new Set(events.map(event => event['type']))]
}

const totalTrained = (events) => {
  if(events.length === 0){
    return 0
  } else {
    return events.reduce((acc, curr) => acc + (curr['num_agents'] ? curr['num_agents'] : 0), 0)
  }
}

function Education(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Continuing Education"/>
      <Divider />
      <Box paddingTop={2} paddingLeft={3} position="relative">
        <Title text={props.account.agent_count ? "2020": ''} variant={'h4'} align={'left'} height={1}/>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={9}>
              <Box position={'relative'} >
                {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={7} x3={4} x4={1}
                 text={['Number of Events', props.events?.y.length]}/>
                  : null}
                {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={7} x3={4} x4={1}
                 text={['Number of Agents Trained', totalTrained(props.events?.y)]}/>
                  : null}
                {props.account.agent_count ?  <TopicsList topics={getTopics(props.events?.y)} /> : null }
              </Box>
          </Grid>
        </Grid>
      </Box>
      <Box paddingTop={2} paddingLeft={3} position="relative" paddingBottom={3}>
        <Title text={props.account.agent_count ? "2019": ''} variant={'h4'} align={'left'} height={1}/>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={9}>
            <Box position={'relative'} >
              {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={7} x3={4} x4={1}
                                                       text={['Number of Events', props.events?.ly.length]}/>
                : null}
              {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={7} x3={4} x4={1}
                                                       text={['Number of Agents Trained', totalTrained(props.events?.ly)]}/>
                : null}
              {props.account.agent_count ?  <TopicsList topics={getTopics(props.events?.ly)} /> : null }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
      //         <Title text={props.account.agent_count ? "2020": ''} variant={'h4'} align={'left'} height={1}/>
      //         <Grid container>
      //           <Grid item xs={1} />
      //           <Grid item xs={9}>
      //             <Box position={'relative'} height={85}>
      //               {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={7} x3={4} x4={1}
      //                                                        text={['Number of Events', props.events?.y.length]}/>
      //                 : null}
      //               {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={7} x3={4} x4={1}
      //                                                        text={['Number of Agents Trained', totalTrained(props.events?.y)]}/>
      //                 : null}
      //               <TopicsList topics={getTopics(props.events?.y)} />
      //         </Box>
      //     </Grid>
      //   </Grid>
      //
      // </Box>
      // {/*<Box paddingTop={1} paddingLeft={3} position="relative" minHeight={85}>*/}
      // {/*  <Title text={props.account.agent_count ? "Last Year": ''} variant={'h4'} align={'left'} height={1}/>*/}
      // {/*  <Box position={'relative'} height={105}>*/}
      // {/*    {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}*/}
      // {/*       text={['Number of Events', props.events?.ly.length]}/>*/}
      // {/*      : null}*/}
      // {/*    {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={7} x3={4} x4={1}*/}
      // {/*       text={['Number of Agents Trained', totalTrained(props.events?.ly)]}/>*/}
      // {/*      : null}*/}
      // {/*    {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}*/}
      // {/*       text={['Topics Trained', displayEvents(props.events?.ly)]}/>*/}
      // {/*      : null}*/}
      // {/*  </Box>*/}
      // {/*</Box>*/}

    // </Card>
  );
}

Education.propTypes = {
  className: PropTypes.string
};

export default Education;
