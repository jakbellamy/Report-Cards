import React from 'react';
import { useUpcomingBestStyles } from './styles';
import {
  Box,
  CardHeader,
  Card
} from '@material-ui/core';

export default function UpcomingBest(props) {
  const classes = useUpcomingBestStyles();
  return (
    <Card >
      <center>
        <CardHeader title={'Building a Championship Season in with Dr. Kevin Elko'} />
      </center>
      <Box padding={5} paddingTop={1}>
        <center><img
          src={'https://supremebest.com/wp-content/uploads/2021/01/D44DEBE4-84F2-44EF-98DC-A946D243C709.jpg'}
          height={'270'}
          width={'auto'}
        /></center>
      </Box>
    </Card>
  );
}
