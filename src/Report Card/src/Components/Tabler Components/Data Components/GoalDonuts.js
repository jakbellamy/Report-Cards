import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Page,
  Avatar,
  Icon,
  Grid,
  Card,
  Text,
  Table,
  Alert,
  Progress,
  colors,
  Dropdown,
  Button,
  StampCard,
  StatsCard,
  Badge,
} from "tabler-react";

import C3Chart from "react-c3js";
import Box from '@material-ui/core/Box';
import ProgressMeterCard from './Data Components/Tabler Components/ProgressCard';
import DonutProgressCard from './Data Components/Tabler Components/DonutProgressCard';
import PercentToGoalCard from './Data Components/Tabler Components/PercentToGoalCard';


const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function Test(props) {
  const classes = useStyles();
  return (
    <Box marginTop={'2%'}>
      <Grid.Row>
        <PercentToGoalCard
          header={'Percent to Goal'}
          percentageToGoal={.86}
        />
        <PercentToGoalCard
          header={'Percent to Stretch Goal'}
          percentageToGoal={.57}
        />
        {/*<DonutProgressCard*/}
        {/*  header={'Percent to Goal'}*/}
        {/*  percentageToGoal={.86}*/}
        {/*/>*/}
      </Grid.Row>
    </Box>
  );
}
