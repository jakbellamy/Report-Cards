import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import 'chartjs-plugin-trendline';
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

defaults.global.defaultFontFamily = 'Arial'

function UnitsOverTime({
                          data: dataProp,
                          labels,
                          className,
                          graphType,
                          office,
                          ...rest
                        }) {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        type: 'line',
        label: 'Supreme Units Over Time',
        data: dataProp,
        backgroundColor: fade('#0873d7', 0.35),
        borderColor: '#0873d7',
        borderWidth: 1,
        fade:  {color: '#054480', value: 90},
        trendlineLinear: {
          style: fade('#0873d7', 0.75),
          lineStyle: "dotted|solid",
          width: 2
        }
      },
      {
        type: 'line',
        label: 'Office Units Over Time',
        data: office,
        borderColor: '#0c2ba9',
        borderWidth: 1,
        backgroundColor: fade('#373c47', 0.15),
        trendlineLinear: {
          style: fade('#373c47', 0.5),
          lineStyle: "dotted|solid",
          width: 2
        }
      }
    ],
    labels
  };

  const options = {
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
            maxTicksLimit: 10,
            callback: (value) => (value > 0 ? `${value} Units` : value)
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
          let label = `${tooltipItem.yLabel}`;

          if (tooltipItem.yLabel > 0) {
            label = `${tooltipItem.xLabel}: ${label} Units`;
          }

          return label;
        }
      }
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      id={'units-over-time'}
      {...rest}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

UnitsOverTime.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired
};

export default UnitsOverTime;
