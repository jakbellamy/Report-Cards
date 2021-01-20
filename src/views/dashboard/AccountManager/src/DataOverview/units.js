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
        mainValue={props.y.supremeUnits}
        mainText={'Supreme 2020'}
        lyValue={props.ly.supremeUnits}
        valueName={'supremeUnits'}
        calcChange={props.calcChange}
        insertCommas={props.insertCommas}
      />
      <Divider />
      <DataBlock
        mainValue={props.y.officeUnits}
        mainText={'Office 2020'}
        lyValue={props.ly.officeUnits}
        valueName={'officeUnits'}
        calcChange={props.calcChange}
        insertCommas={props.insertCommas}
      />
      <Divider />
      <DataBlock
        mainValue={props.y.mktUnits}
        mainText={'Share 2020'}
        lyValue={props.ly.mktUnits}
        valueName={'mktUnits'}
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
