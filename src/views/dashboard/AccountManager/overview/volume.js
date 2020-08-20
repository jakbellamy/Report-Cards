import React from 'react';
import { Box, Card, Divider, makeStyles, GridList, GridListTile, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

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
      <Box
        paddingLeft={1}
        paddingRight={1}
        position="relative"
        height={43}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingTop={0} position="relative">
              <Typography
                align="center"
                variant="h4"
                color="textPrimary"
              >
                {props.y.supremeVol ? ('$' + props.insertCommas(props.y.supremeVol)): ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
              >
                Supreme Volume
              </Typography>
            </GridListTile>
          </Box>
        </GridList>
      </Box>
      <Divider />
      <Box
        paddingLeft={1}
        paddingRight={1}
        position="relative"
        height={35}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingBottom={10} position="relative">
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {props.ly.supremeVol ? '$' + (props.insertCommas(props.ly.supremeVol)): ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="body1"
                color="textPrimary"
              >
                Last Year
              </Typography>
            </GridListTile>
          </Box>
        </GridList>
      </Box>

      <Divider />

      <Box
        paddingLeft={1}
        paddingRight={1}
        position="relative"
        height={33}
        className={props.calcChange('supremeVol') >= 0 ? classes.success : classes.fail}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingBottom={10} position="relative">
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {props.ly.supremeVol ? (props.calcChange('supremeVol')) + '%' : ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="body1"
                color="textPrimary"
              >
                Percent Change
              </Typography>
            </GridListTile>
          </Box>
        </GridList>
      </Box>

      <Divider />

      <Box
        paddingLeft={1}
        paddingRight={1}
        position="relative"
        height={43}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingTop={0} position="relative">
              <Typography
                align="center"
                variant="h4"
                color="textPrimary"
              >
                {props.y.mktVol ? (props.insertCommas(props.y.mktVol) + '%'): ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box paddingTop={10} position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
              >
                Supreme Share
              </Typography>
            </GridListTile>
          </Box>
        </GridList>
      </Box>
      <Divider />
      <Box
        paddingLeft={1}
        paddingRight={1}
        position="relative"
        height={35}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingBottom={10} position="relative">
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {props.ly.mktVol ? (props.insertCommas(props.ly.mktVol) + '%'): ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="body1"
                color="textPrimary"
              >
                Last Year
              </Typography>
            </GridListTile>
          </Box>
        </GridList>
      </Box>

      <Divider />

      <Box
        paddingLeft={1}
        paddingRight={1}
        position="relative"
        height={33}
        className={props.calcChange('mktVol') >= 0 ? classes.success : classes.fail}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingBottom={10} position="relative">
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {props.ly.mktVol ? (props.calcChange('mktVol')) + '%' : ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="body1"
                color="textPrimary"
              >
                Percent Change
              </Typography>
            </GridListTile>
          </Box>
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
