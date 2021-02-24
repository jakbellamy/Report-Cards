import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  CardContent,
  Typography
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

export const DataBox = props => {
  let { className, title, valueYTD, valueComp, differenceValue, captions, ...rest } = props;
  const positiveDifference = differenceValue && differenceValue.charAt(0) === '+';
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
      <Card>
        <Card.Body>
          <Grid.Row>
            <Grid.Col sm={7}>
              <Typography variant={'subtitle2'}>Year-to-Date</Typography>
              <Header className={'font-bold mb-2'}>{title}</Header>
            </Grid.Col>
            <Grid.Col sm={5} align={'left'}>
              <Header className={classes.differenceValue}>{differenceValue}</Header>
            </Grid.Col>
          </Grid.Row>


          <Grid.Row>
            <Grid.Col sm={5}>
              <Header className='font-normal mb-0'>{captions[0]}</Header>
            </Grid.Col>
            <Grid.Col sm={7} align={'right'}>
              <Header className='font-medium mb-0'>{valueYTD}</Header>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col sm={5}>
              <Header className='font-normal mb-0'>{captions[1]}</Header>
            </Grid.Col>
            <Grid.Col sm={7} align={'right'}>
              <Header className='font-medium mb-0'>{valueComp}</Header>
            </Grid.Col>
          </Grid.Row>

        </Card.Body>
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
