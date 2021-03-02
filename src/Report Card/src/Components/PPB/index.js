import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, Grid} from '@material-ui/core'
import { Header } from 'tabler-react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CenteredImage from '../_Modules/centeredImage';
const data = require('../../../data/ppb.json')

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    fontSize: '25px',
    paddingTop: '30px',
    margin: '-1.5rem 0 1rem 20px',
    textAlign: 'left',
  },
  date: {
    fontWeight: 'bold',
    fontSize: '19px',
    textAlign: 'left',
    marginLeft: '20px',
    color: '#4C4C4C'
  },
  text: {
    flexWrap: 'wrap',
    maxWidth: '260px',

  }
}));

export default function PnPB(props) {
  const classes = useStyles();
  return (
    <Box marginBottom={1.5}>
      <Grid container spacing={3}>
        {data.map(event => (
          <Grid xs={6} padding={3}>
            <Box padding={1.5} marginTop={'15px'}>
              <Card elevation={0} align={'center'} width={400}>
                <Box height={200} marginTop={'15px'} >
                  <CenteredImage height={195} src={event['Image']}/>
                </Box>
                <Box height={130}>
                  <Typography className={classes.date}>
                    {event['Date']}
                  </Typography>
                  <Typography className={classes.title}>
                    {event['Title']}
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
