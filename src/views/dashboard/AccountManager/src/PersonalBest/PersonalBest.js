import React from 'react';
import { Box, Card, CardHeader, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Title from '../_Components/Title'
import SimpleList from '../_Components/SimpleList'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

function PersonalBest(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Personal & Professional Best"/>
      <Divider />
      <Box p={1} paddingTop={3} position="relative" height={430}>
        <Title text={props.account.agent_count ? "Next Month's Program": ''} variant={'h3'} align={'center'}/>
        <Box position={'relative'} height={105}>
          {props.account.agent_count ? <SimpleList variant='subtitle1'
                                                   text={['Date', '00/00/0000']}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1'
                                                   text={['Topic', 'Name of Topic']}/>
            : null}
        </Box>
        <Title text={props.account.agent_count ? "Smart Trivia Stats" : ''} variant={'h3'} align={'center'}/>
        <Box position={'relative'} height={85}>
          <Grid container spacing={0}>
            <Grid item xs={1}/>
            <Grid item xs={7}>
              <Typography variant={'subtitle1'}>
                {props.account.agent_count ? 'Cumulative Charitable Contribution' : ''}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant={props.variant} align={'right'}>
                {props.account.agent_count ? '$00,000' : ''}
              </Typography>
            </Grid>
            <Grid item xs={2}/>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
}

PersonalBest.propTypes = {
  className: PropTypes.string
};

export default PersonalBest;
