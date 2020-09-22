import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, GridList, GridListTile, Typography, Divider, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

export default function DataBlock(props) {
  const classes = useStyles();
  let s = props.money ? '$' : ''
  let p = props.percent ? '%' : ''
  return (
    <Box>
      <Box
        paddingLeft={1}
        paddingRight={1}
        position="relative"
        height={43}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingTop={0} position={'relative'}>
              <Typography
                align="center"
                variant="h4"
                color="textPrimary"
              >
                {props.mainValue ? s + props.insertCommas(props.mainValue) + p : ''}
              </Typography>
            </Box>
          </GridListTile>
          <Box paddingTop={10} position="relative">
            <GridListTile className={classes.subvalue}>
              <Typography
                variant="subtitle1"
                color="textPrimary"
              >
                {props.mainText}
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
                {props.lyValue ? s + props.insertCommas(props.lyValue) + p: ''}
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
        className={props.calcChange(props.valueName) >= 0 ? classes.success : classes.fail}
      >
        <GridList className={classes.gridList} cols={2}>
          <GridListTile className={classes.value}>
            <Box paddingBottom={10} position="relative">
              <Typography
                variant="body1"
                color="textPrimary"
              >
                {props.lyValue ? (props.calcChange(props.valueName)) + '%' : ''}
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
    </Box>



  );
}
