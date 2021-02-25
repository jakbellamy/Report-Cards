import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 25,
    fontWeight: 'medium',
    fontFamily: 'Ubuntu',
    color: 'white',
    marginTop: '20%',
    marginLeft: '30%'
  },
  top: {
    backgroundColor: '#4D94C8',
    margin: '-1.5rem',
    paddingRight: '50%',
    borderRadius: ' 15px 50px 30px 5px;'
  }
}));

export default function DataTable(props) {
  const classes = useStyles();
  const { data } = props
  return (
    <Card elevation={0}>
      <Grid container>
        <Grid item xs={5}>
          <div className={classes.top}>
            <Typography className={classes.title}>2020 Year End Review</Typography>

          </div>
        </Grid>
      </Grid>

      <Box height={300} >

      </Box>
    </Card>

  );
}
