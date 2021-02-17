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
import { asUSD, printPercent } from '../../../../functions/dataDisplayers';


export default function PercentToGoal(props) {
  let { incentive, percentageToGoal, header } = props

  let displayProgress = printPercent(percentageToGoal, -2)
  percentageToGoal = percentageToGoal <= 1 ? percentageToGoal * 100 : 100
  let progressColor = setDonutColor(percentageToGoal)
  let percentLeft = percentageToGoal <= 100 ? 100 - percentageToGoal : 0

  if(incentive === 0){
    incentive = 'Re-Evaluate'
  } else {
    incentive = '+$' + incentive + '/Mo'
  }

  console.log(percentageToGoal)
  return (
    <Grid.Col sm={6}>
      <Card>
        <Card.Body>
          <Card.Body className="text-center">
            <Header size={10}>{header}</Header>
            <Header size={5}>{incentive}</Header>
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
