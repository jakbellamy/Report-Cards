import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function NullBlock(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}  />
    </Grid>
  );
}
