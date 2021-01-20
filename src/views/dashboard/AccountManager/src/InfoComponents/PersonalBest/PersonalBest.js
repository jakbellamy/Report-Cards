import React from 'react';
import _ from 'lodash';
import { Box, Card, CardHeader, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Title from '../../Modules/Title'
import SimpleList from '../../Modules/SimpleList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  link: {
    color: 'blue'
  }
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
      <Box paddingTop={2} position="relative" height={295} padding={4}>
        {/*<Title text={"Recent Events"} variant={'h3'} align={'center'}/>*/}
        <SimpleList variant='subtitle2' noshift={false} xs1={4} text={
          ['Date', 'Event']}
        />

        <Box position={"relative"} height={100} >
          {_.map(props.ppb.slice(0,5), event => {
            return <SimpleList variant='subtitle1' noShift={false} xs1={4} text={
              [event['Date'], event['Title']]}
            />
          })}

        </Box>
      </Box>
      {/*<Typography variant={'subtitle2'} align={'center'}>For all past events, please visit <a className={classes.link} href='http://www.SupremeBest.com/supreme-best/the-vault/' target="_blank">the Vault</a> </Typography>*/}
    </Card>
  );

}

PersonalBest.propTypes = {
  className: PropTypes.string
};

export default PersonalBest;
