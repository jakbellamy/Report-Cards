import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Title from '../_Components/Title'
import SimpleList from '../_Components/SimpleList'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

const displayEvents = (events) => {
  console.log(events.length)
  if(events.length == 0){
    return ''
  } else {
    events = [...new Set(events.map(event => event['type']))]
    if(events.length == 1){
      return events[0]
    } else if(events.length == 2) {
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

const totalTrained = (events) => {
  if(events.length == 0){
    return 0
  } else {
    return events.reduce((acc, curr) => acc + (curr['num_agents'] ? curr['num_agents'] : 0), 0)
  }
}

function Education(props, { className, ...rest }) {
  const classes = useStyles();

  console.log('last year', props.events?.ly)
  console.log('this year', props.events?.y)
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Continuing Education"/>
      <Divider />
      <Box paddingTop={1} paddingLeft={3} position="relative" minHeight={150}>
        <Title text={props.account.agent_count ? "This Year": ''} variant={'h4'} align={'left'} height={1}/>
        <Box position={'relative'} height={105}>
          {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}
             text={['Number of Events', props.events?.y.length]}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}
            text={['Number of Agents Trained', totalTrained(props.events?.y)]}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}
             text={['Topics Trained', displayEvents(props.events?.y)]}/>
            : null}
        </Box>
      </Box>
      <Box paddingTop={1} paddingLeft={3} position="relative" minHeight={160}>
        <Title text={props.account.agent_count ? "Last Year": ''} variant={'h4'} align={'left'} height={1}/>
        <Box position={'relative'} height={105}>
          {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}
             text={['Number of Events', props.events?.ly.length]}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}
             text={['Number of Agents Trained', totalTrained(props.events?.ly)]}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' height={1} x1={0} x2={4} x3={7} x4={1}
             text={['Topics Trained', displayEvents(props.events?.ly)]}/>
            : null}
        </Box>
      </Box>

    </Card>
  );
}

Education.propTypes = {
  className: PropTypes.string
};

export default Education;
