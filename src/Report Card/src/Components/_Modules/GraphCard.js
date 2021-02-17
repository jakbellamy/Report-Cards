import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { cardElevation } from '../../../styles';
import {
  Header
} from 'tabler-react';
import Box from '@material-ui/core/Box';
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
            <Header.H2>Quarterly Market Share</Header.H2>
          </Box>

          <img src={props.imageSrc} width={'100%'} height={props.height} />
        </center>
      </Card>
    </Box>

  );
}
