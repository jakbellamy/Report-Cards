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
  ProgressCard,
  Badge,
} from "tabler-react";

import C3Chart from "react-c3js";
import Box from '@material-ui/core/Box';
import ProgressMeterCard from './Data Components/Tabler Components/ProgressCard';


const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function Test(props) {
  const classes = useStyles();
  return (
    <Box marginTop={'2%'}>
      <Grid.Row>
        <ProgressMeterCard
          header={'Percent to Goal'}
          percentageToGoal={.86}
        />
      </Grid.Row>
    </Box>
  );
}
