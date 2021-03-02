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
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    fontFamily: 'Fira Sans',
    margin: '-1rem 0 0 0',
    textAlign: 'center'
  }
}));

export default function GraphCard(props) {
  const classes = useStyles();
  return (
    <Box marginTop={'2%'}>
      <Card elevation={cardElevation}>
          <Box marginTop={3} >
            <Typography className={classes.title}>
              Supreme Market Share
            </Typography>
          </Box>

          <img src={props.imageSrc} width={'100%'} height={props.height} />
      </Card>
    </Box>

  );
}
