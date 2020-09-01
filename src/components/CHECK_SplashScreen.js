import React from 'react';
import {
  Box,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import OPEN_Logo from 'src/components/OPEN_Logo';
import CachedIcon from '@material-ui/icons/Cached';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  },
  logo: {
    width: 200,
    maxWidth: '100%'
  }
}));

function SlashScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        mb={6}
      >
      </Box>
      <CircularProgress />
    </div>
  );
}

export default SlashScreen;
