import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, CardHeader, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './styles';

export const DataBox = props => {
  let { className, title, valueYTD, valueComp, differenceValue, captions, ...rest } = props;
  const positiveDifference = differenceValue && differenceValue.charAt(0) === '+';
  const classes = useStyles({ positiveDifference, ...props });

  captions = captions.map(caption => {
    if(!caption){ return '' }
    // return caption.split(' ')[1]
    return (
      caption.split(' ')[0].slice(0,3)
      + ' '
      + caption.split(' ')[1]
    )
  })

  return (
    <Card {...rest} className={clsx(classes.root, className)} elevation={0}>

      <Typography className={classes.title} variant="h5">
        <span>
          {title}
        </span>
        <span className={classes.differenceValue}>
          {differenceValue}
        </span>
      </Typography>

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={'auto'}>
            <Typography variant="subtitle2">{valueYTD}</Typography>
          </Grid>
          <Grid item xs={'auto'}>
            <i><Typography variant="caption">({captions[0]})</Typography></i>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={'auto'}>
            <Typography variant="subtitle2">{valueComp}</Typography>
          </Grid>
          <Grid item xs={'auto'}>
            <i><Typography variant="caption">({captions[1]})</Typography></i>
          </Grid>
        </Grid>

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
