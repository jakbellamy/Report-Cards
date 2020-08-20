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
    paddingTop: theme.spacing(1),
  },
  value: {
    textAlign: 'center',
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
                {props.y.supremeUnits ? props.insertCommas(props.y.supremeUnits): ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box paddingTop={10} position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
              >
                Supreme Units
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
                {props.ly.supremeUnits ? props.insertCommas(props.ly.supremeUnits): ''}
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
        className={props.calcChange('supremeUnits') >= 0 ? classes.success : classes.fail}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingBottom={10} position="relative">
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {props.ly.supremeUnits ? (props.calcChange('supremeUnits')) + '%' : ''}
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
                {props.y.mktUnits ? (props.insertCommas(props.y.mktUnits) + '%'): ''}
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
                {props.ly.mktUnits ? (props.insertCommas(props.ly.mktUnits) + '%'): ''}
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
        className={props.calcChange('mktUnits') >= 0 ? classes.success : classes.fail}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingBottom={10} position="relative">
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {props.ly.mktUnits ? (props.calcChange('mktUnits')) + '%' : ''}
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
