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
import useStyles from './triStyles';
import { cardElevation } from '../../../../styles';
import Box from '@material-ui/core/Box';

export const TriDataBox = props => {
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
        <Box height={140}>
        <Card.Body>

          <Grid.Row>
            <Grid.Col sm={7}>
            {differenceValue != '0%' ? (
                <Typography className={classes.top}>{period}</Typography>
            ) : null}
            </Grid.Col>
            <Grid.Col sm={'auto'}>
              <div >
                <Header className={classes.differenceValue}>{differenceValue === '0%' ? '' : differenceValue}</Header>
              </div>
            </Grid.Col>
          </Grid.Row>
          <Box
            textAlign={differenceValue == '0%' ? 'center' : 'left'}
            marginTop={differenceValue == '0%' ? '8px' : 0}
          >
            <Typography
              className={differenceValue == '0%' ? classes.altTitle : classes.title}
            >{title}</Typography>
            <Grid.Row >
              <Grid.Col sm={'auto'} >
                {differenceValue != '0%' ? (
                  <Header size='2' className='font-normal mb-0'>{captions[0] ? captions[0].split(' ')[1] : ''}</Header>
                ) : (
                  <Box marginTop={differenceValue == '0%' ? 2 : 0}>
                    <Header size='2' className='font-normal mb-0'>{captions[0] ? captions[0].split(' ')[1] : ''} Total</Header>
                  </Box>
                )}

              </Grid.Col>
              <Grid.Col sm={6} align={'right'}>
                <Box marginTop={differenceValue == '0%' ? 2 : 0}>
                  <Header size='2' className='font-medium mb-0'>{valueYTD}</Header>
                </Box>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col sm={'auto'}>
                <Header size='2' className='font-normal mb-0'>{captions[1] ? captions[1].split(' ')[1] : ''}</Header>
              </Grid.Col>
              <Grid.Col sm={6} align={'right'}>
                <Header size='2' className='font-medium mb-0'>{valueComp}</Header>
              </Grid.Col>
            </Grid.Row>
          </Box>


        </Card.Body>
        </Box>
      </MCard>
  );
};

TriDataBox.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  differenceValue: PropTypes.string,
  caption: PropTypes.string
};
