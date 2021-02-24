import React from 'react';
import { useStyles } from './styles'
import { cardElevation } from '../../../styles';
import "tabler-react/dist/Tabler.css";
import { Header} from "tabler-react"
import {
  Card,
  Box,
  CardHeader
} from '@material-ui/core';
// import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';
import { variableBestTagline } from '../../../data/constants';

export default function CSAT(props) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Card className={classes.card} elevation={cardElevation}>
        {/*<CardHeader*/}
        {/*  title ={*/}
        {/*    <Box>*/}
        {/*      <Typography gutterBottom variant="h3" component="h1" className={classes.title}>*/}
        {/*        Continuing Education*/}
        {/*      </Typography>*/}
        {/*      /!*{OPTIONAL SUBTITLE}*!/*/}
        {/*      /!*<Typography gutterBottom variant="subtitle1" component="h1" className={classes.subtitle}>*!/*/}
        {/*      /!*  {variableBestTagline}*!/*/}
        {/*      /!*</Typography>*!/*/}
        {/*    </Box>*/}
        {/*  } />*/}
        <Header.H1 align={'center'} size={1}>Customer Service FACTS</Header.H1>
      </Card>
    </Box>

  );
}
