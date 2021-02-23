import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { cardElevation } from '../../../styles';
import {
  Header
} from 'tabler-react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  root: {}
}));

export default function GraphCard(props) {
  const classes = useStyles();
  return (
    <Box>
      <Card elevation={cardElevation}>
        <center>
          <Box marginTop={3} paddingBottom={-3} marginBottom={-1}>
            <Typography variant={'h2'} >SUPREME SHARE</Typography>
          </Box>

          <img src={props.imageSrc} width={'100%'} height={props.height} />
        </center>
      </Card>
    </Box>

  );
}
