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
    return (
      caption.split(' ')[0].slice(0,3)
      + ' '
      + caption.split(' ')[1]
    )
  })

  return (
    <Card {...rest} className={clsx(classes.root, className)} elevation={0}>
      {/*<CardHeader title={title} />*/}
      <Typography className={classes.title} variant="h5">
        <span>
          {title}
        </span>
        <span className={classes.differenceValue}>
          {differenceValue}
        </span>
      </Typography>



      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <Typography variant="subtitle2">{valueYTD}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="caption">{captions[0]}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <Typography variant="subtitle2">{valueComp}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="caption">{captions[1]}</Typography>
              </Grid>
            </Grid>
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
