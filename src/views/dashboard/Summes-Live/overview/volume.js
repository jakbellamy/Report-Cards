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
        height={45}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {props.y.mktVol ? (props.insertCommas(props.y.mktVol)) + '%' : ''}
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
      <Divider />
      <Box className={props.calcChange('mktVol') >= 0 ? classes.success : classes.fail}
        position="relative"
        height={27}
      >
        <GridList cols={2}>
          <GridListTile className={classes.value}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
            >
              {props.ly.mktVol ? (props.calcChange('mktVol')) + '%' : ''}
            </Typography>
          </GridListTile>
          <GridListTile>
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              vs. prior year
            </Typography>
          </GridListTile>
        </GridList>
      </Box>
      <Divider />
      <Box
        p={1}
        position="relative"
        height={45}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {props.y.supremeVol ? (props.insertCommas(props.y.supremeVol)) + '%' : ''}
            </Typography>
          </GridListTile>
          <GridListTile className={classes.subvalue}>
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Supreme Volume
            </Typography>
          </GridListTile>
        </GridList>
      </Box>
      <Divider />
      <Box className={props.calcChange('supremeVol') >= 0 ? classes.success : classes.fail}
           position="relative"
           height={27}
      >
        <GridList cols={2}>
          <GridListTile className={classes.value}>
            <Typography
              variant="subtitle1"
              color="textPrimary"
            >
              {props.ly.supremeVol ? (props.calcChange('supremeVol')) + '%' : ''}
            </Typography>
          </GridListTile>
          <GridListTile>
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              vs. prior year
            </Typography>
          </GridListTile>
        </GridList>
      </Box>
      <Divider />
    </Card>
  );
}

Volume.propTypes = {
  className: PropTypes.string
};

export default Volume;
