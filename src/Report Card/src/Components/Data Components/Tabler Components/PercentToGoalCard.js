import React from 'react';
import {
  Grid,
  ProgressCard,
  StatsCard,
  Card,
  colors,
  Header
} from 'tabler-react';
import C3Chart from "react-c3js";
import { setDonutColor } from '../_functions';
import { printPercent } from '../../../../functions/dataDisplayers';


export default function PercentToGoal(props) {
  let { percentageToGoal, header } = props

  let displayProgress = printPercent(percentageToGoal, -2)
  percentageToGoal = percentageToGoal <= 1 ? percentageToGoal * 100 : 100
  let progressColor = setDonutColor(percentageToGoal)
  let percentLeft = percentageToGoal <= 100 ? 100 - percentageToGoal : 0

  console.log(percentageToGoal)
  return (
    <Grid.Col sm={6}>
      <Card>
        <Card.Body>
          <Card.Body className="text-center">
            <Header size={5}>{header}</Header>
            <div className="display-4 font-weight-bold mb-4">{displayProgress}</div>
          </Card.Body>
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
                data1: 'Achieved',
                data2: 'Remaining',
              }
            }}
            legend={{
              // show: true, //hide legend
            }}
            padding={{
              bottom: 0,
              top: -4,
            }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}
