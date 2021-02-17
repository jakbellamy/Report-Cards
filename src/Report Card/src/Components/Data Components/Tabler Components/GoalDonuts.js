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
import ProgressMeterCard from './ProgressCard';
import DonutProgressCard from './DonutProgressCard';
import PercentToGoalCard from './PercentToGoalCard';
import { setDonutColor } from '../_functions';


const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function GoalDonuts(props) {
  const classes = useStyles();
  let {mshare, goals, incentives} = props

  let progressColors = goals.map(goal => {
    console.log(setDonutColor((mshare/goal)*100))
    return setDonutColor((mshare/goal)*100)
  })

  console.log(progressColors)
  return (
    <Box marginTop={'2%'}>
      <Grid.Row>
        <PercentToGoalCard
          header={'Market Share Goal'}
          percentageToGoal={mshare/goals[0]}
          mshare={mshare}
          display={goals[0]}
          color={progressColors[0]}
        />
        <PercentToGoalCard
          header={'Stretch Goal'}
          percentageToGoal={mshare/goals[1]}
          mshare={mshare}
          display={goals[1]}
          color={progressColors[1]}
        />
      </Grid.Row>
    </Box>
  );
}
