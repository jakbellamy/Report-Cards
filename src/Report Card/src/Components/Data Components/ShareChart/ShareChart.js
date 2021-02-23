import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, colors } from "tabler-react";
import C3Chart from "react-c3js";

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function ShareChart(props) {
  const classes = useStyles();
  return (
    <Card title={'Quarterly Market Share'}>
      <Card.Body>
        <C3Chart
          data={{
            columns: [
              // each columns data
              ["data1", 11, 8, 15, 18, 19, 17],
              ["data2", 7, 7, 5, 7, 9, 12],
            ],
            type: "area", // default type of chart
            colors: {
              data1: colors["blue"],
              data2: colors["pink"],
            },
            names: {
              // name of each serie
              data1: "Maximum",
              data2: "Minimum",
            },
          }}

          axis={{
            x: {
            type: "category",
            // name of each category
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          }}}
          legend={{
            show: false
          }}
          tooltip={{show: false}}
          />
      </Card.Body>
    </Card>
  );
}
