import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, CardHeader, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';

export const DataBox = props => {
  const { className, title, value, differenceValue, caption, ...rest } = props;
  const positiveDifference = differenceValue && differenceValue.charAt(0) === '+';
  const classes = useStyles({ positiveDifference, ...props });

  return (
    <Card {...rest} className={clsx(classes.root, className)} elevation={0}>
      <CardHeader title={title} />
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h4">{value}</Typography>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.differenceValue} variant="body2">
            {differenceValue}
          </Typography>
          <Typography className={classes.caption} variant="caption">
            {caption}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

DataBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  differenceValue: PropTypes.string,
  caption: PropTypes.string
};
