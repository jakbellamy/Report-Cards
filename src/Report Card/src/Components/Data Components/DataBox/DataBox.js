import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  CardContent,
  Typography,
  Card as MCard
} from '@material-ui/core';
import {
  Grid,
  ProgressCard,
  StatsCard,
  Card,
  colors,
  Header
} from 'tabler-react';
import useStyles from './styles';
import { cardElevation } from '../../../../styles';
import Box from '@material-ui/core/Box';

export const DataBox = props => {
  let { className, title, valueYTD, valueComp, differenceValue, captions, period, ...rest } = props;
  const positiveDifference = differenceValue && differenceValue.charAt(0) === '+' ? !differenceValue.includes('NaN') : false;
  const classes = useStyles({ positiveDifference, ...props });

  captions = captions.map(caption => {
    if (!caption) {
      return '';
    }
    return (
      caption.split(' ')[0].slice(0, 3)
      + ' '
      + caption.split(' ')[1]
    );
  });

  return (
      <MCard elevation={cardElevation}>
        <Card.Body>

          <Grid.Row>
            <Grid.Col sm={7}>
              <Typography className={classes.top}>{period}</Typography>
              <Typography className={classes.title}>{title}</Typography>
            </Grid.Col>
            <Grid.Col sm={5} align={'left'}>
              <div className={classes.center}>
                <Header className={classes.differenceValue}>{
                  differenceValue.includes('NaN') ? '0%' : differenceValue
                }</Header>
              </div>

            </Grid.Col>
          </Grid.Row>
          <Box marginRight={'2rem'}>
            <Grid.Row >
              <Grid.Col sm={'auto'} >
                <Header size='2' className='font-normal mb-0'>{captions[0]}</Header>
              </Grid.Col>
              <Grid.Col sm={6} align={'right'}>
                <Header size='2' className='font-medium mb-0'>{valueYTD}</Header>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col sm={'auto'}>
                <Header size='2' className='font-normal mb-0'>{captions[1]}</Header>
              </Grid.Col>
              <Grid.Col sm={6} align={'right'}>
                <Header size='2' className='font-medium mb-0'>{valueComp}</Header>
              </Grid.Col>
            </Grid.Row>
          </Box>


        </Card.Body>
      </MCard>
  );
};

DataBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  differenceValue: PropTypes.string,
  caption: PropTypes.string
};
