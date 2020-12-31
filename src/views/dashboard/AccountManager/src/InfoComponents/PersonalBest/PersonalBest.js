import React from 'react';
import { Box, Card, CardHeader, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Title from '../../Modules/Title'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  link: {
    color: 'blue'
  }
}));
const recent = ['Better Decisions, Fewer Regrets', 'Love Everybody Better', 'The Energy Bus', 'Profiles in BEST: A Conversation with Herschel Walker', 'Be The Source', 'Choose Better Not Bitter', 'Love Thy Neighbor', 'Everybody Can Serve', 'Keeping Your Promises']

function PersonalBest(props, { className, ...rest }) {
  const classes = useStyles();
  if(props.account){
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Personal & Professional Best"/>
        <Divider />
        <Box paddingTop={2} position="relative" height={395}>
          {/*<Title text={props.account.agent_count ? "Next Month's Program": ''} variant={'h4'} align={'center'}/>*/}
          {/*<Box paddingTop={0.5} position={"relative"} height={95}>*/}
          {/*  <Typography variant={'h5'} align={'center'}>*/}
          {/*    {props.account.agent_count ? 'The Energy Bus with Jon Gordon - Thu Sep 24th at 3 PM' : ''}*/}
          {/*  </Typography>*/}
          {/*</Box>*/}
          <Title text={"Recent Events"} variant={'h3'} align={'center'}/>
          <Box position={"relative"} height={100}>
            {recent.map(event => {
              return <Typography variant={'h4'} align={'center'} >
                {event}
              </Typography>
            })}

            {/*<Typography variant={'h5'} align={'center'} paddingBottom={0.5}>*/}
            {/*  {props.account.agent_count ? 'Be The Source with Tom Flood' : ''}*/}
            {/*</Typography>*/}
            {/*<Typography variant={'h5'} align={'center'} paddingBottom={0.5}>*/}
            {/*  {props.account.agent_count ? 'Choose Better Over Bitter' : ''}*/}
            {/*</Typography>*/}
          </Box>
        </Box>
        <Typography variant={'subtitle2'} align={'center'}>For all past events, please visit <a className={classes.link} href='http://www.SupremeBest.com/supreme-best/the-vault/' target="_blank">the Vault</a> </Typography>
      </Card>
    );
  } else {
    return (
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Personal & Professional Best"/>
        <Divider />
        <Box paddingTop={2} position="relative" height={395}>
        </Box>
      </Card>
    )
  }
}

PersonalBest.propTypes = {
  className: PropTypes.string
};

export default PersonalBest;
