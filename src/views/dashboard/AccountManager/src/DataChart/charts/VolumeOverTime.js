import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
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

function VolumeOverTime({
         data: dataProp,
         labels,
         className,
         graphType,
         company,
         ...rest
       }) {
  const classes = useStyles();
  const theme = useTheme();
  console.log('dataprop', dataProp)
  const data = {
    datasets: [
      {
        type: 'line',
        label: 'Supreme Volume Over Time',
        data: dataProp,
        backgroundColor: '#0873d7',
        borderColor: '#0873d7',
        borderWidth: 1,
        fade:  {color: '#054480', value: 90}
      },
      {
        type: 'line',
        label: 'Office Volume Over Time',
        data: company,
        borderColor: '#0c2ba9',
        borderWidth: 1,
        fade:  {color: '#054480', value: 90}
      }
    ],
    labels
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: true,
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
            callback: (value) => (value > 0 ? `$${value/1000000} Mil` : value)
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
            label = '$' + label/1000 + 'k';
          }

          return label;
        }
      }
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

VolumeOverTime.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired
};

export default VolumeOverTime;
