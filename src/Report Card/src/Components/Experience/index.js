import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid} from '@material-ui/core'
import { Header, colors } from 'tabler-react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const data = require('../../../data/experience.json')

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.success.main,
    fontWeight: 'bold',
    fontSize: '54px',
    paddingTop: '30px'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '23px',
  },
  text: {
    flexWrap: 'wrap',
    maxWidth: '260px',
    margin: '0 -5rem 1rem -5rem'
  }
}));

export default function ExperienceGrid(props) {
  const classes = useStyles();
  return (
    <Box marginBottom={1.5}>
      <Grid container spacing={3}>
        {data.map(stat => (
          <Grid xs={6} padding={3}>
            <Box padding={1.5} paddingBottom={0.5}>
              <Card elevation={0} align={'center'} width={400}>
                <Box height={240} marginTop={'5px'}>
                  <Header className={classes.header}>
                    {stat['Header']}
                  </Header>
                  <Typography className={classes.subtitle}>
                    {stat['Subtitle']}
                  </Typography>
                  <Typography className={classes.text}>
                    {stat['text']}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
