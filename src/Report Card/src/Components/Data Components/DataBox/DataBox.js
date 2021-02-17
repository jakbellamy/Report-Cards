import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import { cardElevation } from '../../../../styles';

export const DataBox = props => {
  let { className, title, valueYTD, valueComp, differenceValue, captions, ...rest } = props;
  const positiveDifference = differenceValue && differenceValue.charAt(0) === '+';
  const classes = useStyles({ positiveDifference, ...props });

  captions = captions.map(caption => {
    if(!caption){ return '' }
    return (
      caption.split(' ')[0].slice(0,3)
      + ' '
      + caption.split(' ')[1]
    )
  })

  return (
    <Card {...rest} className={clsx(classes.root, className)} elevation={cardElevation}>

      <Typography className={classes.title} variant="h3">
        <span>
          {title.replace('Volume', '')}
        </span>
        <span className={classes.differenceValue}>
          {differenceValue}
        </span>
      </Typography>

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={'auto'}>
            <Typography variant="h4" className="display-4 font-weight-bold ">{valueYTD}</Typography>
          </Grid>
          <Grid item xs={'auto'}>
            <Typography variant="caption">({captions[0]})</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={'auto'}>
            <Typography variant="h4" className="display-4 font-weight-bold ">{valueComp}</Typography>
          </Grid>
          <Grid item xs={'auto'}>
            <Typography variant="caption">({captions[1]})</Typography>
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
