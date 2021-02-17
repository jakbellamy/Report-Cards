import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
import ChartRegressions from 'chartjs-plugin-regression'
import regression from 'regression';

import {
  fade,
  makeStyles,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

defaults.global.defaultFontFamily = 'Arial'

function MarketShareChart({
  // data: dataProp,
  ly,
  ytd,
  prod: prod,
  labels: labels,
  className,
  ...rest
}) {
  const classes = useStyles();
  const theme = useTheme();
  console.log(regression.power(prod.map(rec => rec['Market Share Volume'] * 100), {order: 3}))

  let count = prod.length - 1
  let linearRegression = regression.polynomial(
    prod.map(rec => [count-=1, rec['Market Share Volume']]), {'order': '3'}
  ).points
  console.log(linearRegression)
  const data = {
    plugins: [ChartRegressions],

    datasets: [
      // {
      //   label: '2020',
      //   type: 'scatter',
      //   backgroundColor: theme.palette.secondary.main,
      //   data: ytd,
      //   barThickness: 12,
      //   maxBarThickness: 10,
      //   barPercentage: 0.5,
      //   categoryPercentage: 0.5,
      //   regressions: {
      //     type: 'linear',
      //     line: { color: 'red', width: 3 },
      //     calculation: { precision: 5 },
      //
      //   }
      // },
      {
        // label: 'Monthly Supreme Market Share',
        type: 'scatter',
        backgroundColor: theme.palette.secondary.main,
        data: prod.map(rec => rec['Market Share Volume'] * 100) ,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        // regressions: {
        //   type: 'linear',
        //   line: { color: 'red', width: 3}
        // },
      },

      {
        type: 'line',
        // label: '2019 Supreme Average',
        data: linearRegression.map(rec => rec[1]),
        backgroundColor: '#FCF7E1',
        borderColor: '#FCEEE1',
        borderWidth: 1
      }
    ],
    labels
  };
  const options = {
    plugins: {
      regressions: {
        type: ['linear', 'polynomial'],
        line: { color: 'blue', width: 3 },
        // onCompleteCalculation: function callback(chart){ ... }
      }
    },

    responsive: true,
    maintainAspectRatio: false,
    cornerRadius: 20,
    legend: {
      display: true
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            maxTicksLimit: 8,
            callback: (value) => (value > 0 ? `${value}%` : value)
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.dark,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        title: () => {},
        label: (tooltipItem) => {
          let label = `${tooltipItem.yLabel.toFixed(2)}`;

          if (tooltipItem.yLabel > 0) {
            label = `${formatNumber(label)}%`;
          }

          return label;
        }
      }
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      id={'mkt-share-chart'}
      {...rest}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

MarketShareChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired
};

export default MarketShareChart;
