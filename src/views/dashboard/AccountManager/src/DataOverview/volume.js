import React from 'react';
import { Box, Card, Divider, makeStyles, GridList, GridListTile, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DataBlock from './DataBlock';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    paddingTop: theme.spacing(1)
  },
  value: {
    textAlign: 'center'
  },
  valueSuccess: {
    textAlign: 'center',
    backgroundColor: '#E1FFEB'
  },
  valueFail: {
    textAlign: 'center',
    verticalAlign: 'center',
    backgroundColor: '#FFE1E6'
  },
  success: {
    backgroundColor: '#E1FFEB'
  },
  fail: {
    backgroundColor: '#FFE1E6'
  }
}));

function Volume(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <DataBlock
        mainValue={props.y.supremeVol}
        mainText={'Supreme 2020'}
        lyValue={props.ly.supremeVol}
        valueName={'supremeVol'}
        calcChange={props.calcChange}
        insertCommas={props.insertCommas}
        money={true}
      />
      <Divider />
      <DataBlock
        mainValue={props.y.officeVol}
        mainText={'Office 2020'}
        lyValue={props.ly.officeVol}
        valueName={'officeVol'}
        calcChange={props.calcChange}
        insertCommas={props.insertCommas}
        money={true}
      />
      <Divider />
      <DataBlock
        mainValue={props.y.mktVol}
        mainText={'Market Share'}
        lyValue={props.ly.mktVol}
        valueName={'mktVol'}
        calcChange={props.calcChange}
        insertCommas={props.insertCommas}
        percent={true}
      />
    </Card>
  );
}

Volume.propTypes = {
  className: PropTypes.string
};

export default Volume;
