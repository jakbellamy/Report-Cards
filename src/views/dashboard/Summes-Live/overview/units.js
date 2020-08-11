import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  ListSubheader,
  makeStyles,
  Button,
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(0.7),
    // width: 100,
    // height: 40,
  },
  value: {
    textAlign: 'center',
    // verticalAlign: 'text-bottom'
    // paddingRight: theme.spacing(2)
  },
  valueSuccess: {
    textAlign: 'center',
    verticalAlign: 'center',
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
      <Box
        p={1}
        position="relative"
        minHeight={25}
      >
        <GridList cellHeight={20} className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {props.y.mktUnits ? (props.insertCommas(props.y.mktUnits)) + '%' : ''}
            </Typography>
          </GridListTile>
          <GridListTile className={classes.subvalue}>
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Supreme Share
            </Typography>
          </GridListTile>
        </GridList>
      </Box>

        <GridList cellHeight={23} className={classes.gridList} cols={2}>
          <GridListTile className={props.calcChange('mktUnits') >= 0 ? classes.valueSuccess : classes.valueFail}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
            >
              {props.ly.mktUnits ? (props.calcChange('mktUnits')) + '%' : ''}
            </Typography>
          </GridListTile>
          <GridListTile className={props.calcChange('mktUnits') >= 0 ? classes.success : classes.fail}>
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              vs. prior year
            </Typography>
          </GridListTile>
        </GridList>

      <Box
        p={1}
        position="relative"
        minHeight={25}
      >
        <GridList cellHeight={20} className={classes.gridList} cols={2}>
          <GridListTile className={classes.value} >
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {props.y.supremeUnits ? (props.insertCommas(props.y.supremeUnits)) : ''}
            </Typography>
          </GridListTile>
          <GridListTile className={classes.subvalue}>
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Supreme Units
            </Typography>
          </GridListTile>
        </GridList>
      </Box>

        <GridList cellHeight={25} className={classes.gridList} cols={2}>
          <GridListTile className={(props.calcChange('supremeUnits')) >= 0 ? classes.valueSuccess : classes.valueFail}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
            >
              {props.ly.supremeUnits ? (props.calcChange('supremeUnits') + '%') : ''}
            </Typography>
          </GridListTile>
          <GridListTile className={(props.calcChange('supremeUnits')) >= 0 ? classes.success : classes.fail}>
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              vs. prior year
            </Typography>
          </GridListTile>
        </GridList>
    </Card>
  );
}

Volume.propTypes = {
  className: PropTypes.string
};

export default Volume;
