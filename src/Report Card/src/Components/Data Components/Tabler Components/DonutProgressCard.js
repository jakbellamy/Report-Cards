import React from 'react';
import {
  Grid,
  ProgressCard,
  StatsCard,
  Card,
  colors
} from 'tabler-react';
import C3Chart from "react-c3js";
import { setDonutColor } from '../_functions';
import { printPercent } from '../../../../functions/dataDisplayers';


export default function DonutProgressCard(props) {
  let { percentageToGoal, header } = props

  let displayProgress = printPercent(percentageToGoal, -1)
  percentageToGoal = percentageToGoal <= 1 ? percentageToGoal * 100 : 100
  let progressColor = setDonutColor(percentageToGoal)
  let percentLeft = percentageToGoal <= 100 ? 100 - percentageToGoal : 0

  console.log(percentageToGoal)
  return (
    <Grid.Col sm={6}>
      <Card>
        <Card.Header>
          <Card.Title>{header}</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "15rem" }}
            data={{
              columns: [
                ["data1", percentageToGoal],
                ["data2", percentLeft],
              ],
              type: "donut",
              colors: {
                data1: progressColor,
                data2: colors["gray-lighter"],
              },
              names: {
                // name of each serie
                data1: printPercent(percentageToGoal/100, -1),
                data2: printPercent(percentLeft/100, -1),
              }
            }}
            legend={{
              show: true, //hide legend
            }}
            padding={{
              bottom: 0,
              top: 0,
            }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}
