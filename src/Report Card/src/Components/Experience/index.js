import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid} from '@material-ui/core'
import { Header } from 'tabler-react'
import Box from '@material-ui/core/Box';
const data = require('../../../data/experience.json')

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function ExperienceGrid(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {data.map(stat => (
          <Grid xs={6} padding={3}>
            <Box padding={1}>
            <Card elevation={0} >
              <Header>{stat['Header']}</Header>
              <Box height={200}>

              </Box>
            </Card>
            </Box>

          </Grid>
      ))}
    </Grid>
  );
}
