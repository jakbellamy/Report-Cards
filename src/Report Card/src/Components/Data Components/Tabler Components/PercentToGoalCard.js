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
  let { mshare, percentageToGoal, header, display, color } = props

  let displayProgress = printPercent(percentageToGoal, -2)
  percentageToGoal = percentageToGoal <= 1 ? percentageToGoal * 100 : 100

  let percentLeft = percentageToGoal <= 100 ? 100 - percentageToGoal : 0
  display = printPercent(display)



  console.log(percentageToGoal)
  return (
    <Grid.Col sm={6} marginTop={-2}>
      <Card >
        <Card.Body>
          <Card.Body className="text-center">
            <Header className="display-12 font-weight-medium ">{header}</Header>
            <Header size={15}>Current: {printPercent(mshare)}</Header>
            <div className="display-4 font-weight-bold mb-4">{display}</div>
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
                data1: color,
                data2: colors["gray-lighter"],
              },
              names: {
                // name of each serie
                data1: 'Percent to Goal',
                data2: 'Percent Increase to Reach Goal',
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
