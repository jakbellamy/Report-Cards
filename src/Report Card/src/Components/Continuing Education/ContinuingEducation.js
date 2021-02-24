import React from 'react';
import { useStyles } from './styles';
import { cardElevation } from '../../../styles';
import { Card } from '@material-ui/core';

export default function ContinuingEducation(props) {
  const classes = useStyles();
  let { ce2020, ce2021 } = props;

  const sortByMonth = (arr) => {
    return arr.sort((a, b) => {
      return b['month'] - a['month'];
    });
  };

  ce2020 = sortByMonth(ce2020);
  ce2021 = sortByMonth(ce2021);

  return (
    <Card className={classes.card} elevation={cardElevation}>
    </Card>
  );
}
