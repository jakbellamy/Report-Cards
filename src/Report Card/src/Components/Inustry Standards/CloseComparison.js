import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  Grid,
  ProgressCard,
  StatsCard,
  colors,
  Header
} from 'tabler-react';
import Card from '@material-ui/core/Card';
import { cardElevation } from '../../../styles';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function CloseComparison(props) {
  const classes = useStyles();
  return (
    <Card elevation={cardElevation}>
      <Header title={'Supreme vs Industry'}/>
      <Box height={315}>

      </Box>
    </Card>
  );
}
