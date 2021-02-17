import React from 'react';
import { Grid, ProgressCard, } from "tabler-react";
import {
  determineProgressMeterColor,
  printPercent
} from '../_functions';


export default function ProgressMeterCard(props) {
  const { percentageToGoal, header } = props
  let progressWidth = percentageToGoal * 100
  let content = printPercent(percentageToGoal, -1)
  let progressColor = determineProgressMeterColor(progressWidth)

  return (
    <Grid.Col sm={6} lg={6}>
      <ProgressCard
        header={header}
        content={content}
        progressColor={progressColor}
        progressWidth={progressWidth}
      />
    </Grid.Col>
  );
}
