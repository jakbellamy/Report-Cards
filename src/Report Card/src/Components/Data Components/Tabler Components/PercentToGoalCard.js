import React from 'react';
import {
  Grid,
  ProgressCard,
  StatsCard,
  Card,
  colors,
  Header
} from 'tabler-react';
import C3Chart from 'react-c3js';
import { printPercent } from '../../../../functions/dataDisplayers';
import Typography from '@material-ui/core/Typography';


export default function PercentToGoal(props) {
  let { mshare, goal, header, color } = props;

  let percentageToGoal = mshare / goal <= 1 ? mshare / goal * 100 : 100;
  let percentLeft = percentageToGoal <= 100 ? 100 - percentageToGoal : 0;


  console.log(percentageToGoal);
  return (
    <Grid.Col sm={6} marginTop={-2}>
      <Card >
          <Card.Body className="text-center" paddingTop={-2}>
            <Typography variant={'subtitle2'}>Market Share Goals</Typography>

            <Header className="display-4 font-weight-medium mb-auto">{header}</Header>
            <Header className="display-4 font-weight-bold mb-0">{printPercent(goal)}</Header>
          </Card.Body>
          <C3Chart
            style={{ height: '15rem'}}
            data={{
              columns: [
                ['data1', percentageToGoal],
                ['data2', percentLeft]
              ],
              type: 'donut',
              colors: {
                data1: color,
                data2: colors['gray-lighter']
              },
              names: {
                data1: 'Current: ' + printPercent(mshare, -1),
                data2: percentageToGoal < 100 ? 'Difference: ' + printPercent(goal - mshare, -1) : 'Difference: 0%'
              },
              labels: false
            }}
            legend={{
              show: true, //hide legend
            }}
            padding={{
              bottom: 0,
              top: -4
            }}
            tooltip={{
              show: false
            }}
            donut={{
              label: {
                show: false
              }
            }}
          />
      </Card>
    </Grid.Col>
  );
}
