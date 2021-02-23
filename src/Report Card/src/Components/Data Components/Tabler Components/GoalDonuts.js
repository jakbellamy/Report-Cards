import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from 'tabler-react';
import Box from '@material-ui/core/Box';
import PercentToGoalCard from './PercentToGoalCard';
import { setDonutColor } from '../_functions';

export default function GoalDonuts(props) {
  let { mshare, goals, incentives } = props;

  let progressColors = goals.map(goal => {
    console.log(setDonutColor((mshare / goal) * 100));
    return setDonutColor((mshare / goal) * 100);
  });

  console.log(progressColors);
  return (
    <Box marginTop={'2%'}>
      <Grid.Row>
        <PercentToGoalCard
          header={'Goal'}
          mshare={mshare}
          color={progressColors[0]}
          goal={goals[0]}
        />
        <PercentToGoalCard
          header={'Stretch'}
          percentageToGoal={mshare / goals[1]}
          mshare={mshare}
          color={progressColors[1]}
          goal={goals[1]}

        />
      </Grid.Row>
    </Box>
  );
}
