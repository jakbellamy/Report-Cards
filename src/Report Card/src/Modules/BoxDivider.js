import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Container } from '@material-ui/core';
import { ifExists } from '../../functions/conditionals';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function BoxDivider(props) {
  const classes = useStyles();
  return (
    <Box
      paddingTop={ifExists(props.paddingTop, 1)}
      paddingBottom={ifExists(props.paddingBottom, 1)}
    >
      <Divider/>
    </Box>
  );
}
