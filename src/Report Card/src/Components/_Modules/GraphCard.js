import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { cardElevation } from '../../../styles';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function GraphCard(props) {
  const classes = useStyles();
  return (
    <Card elevation={cardElevation}>
      <center>
        <img src={props.imageSrc} width={'auto'} height={props.height} />
      </center>
    </Card>
  );
}
