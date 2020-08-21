import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
  icon: {
    width: 500,
    height: 500,
  }
}));

function ReportStatus(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Production Report"/>
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={220}
        alignContent='center'>
        <IconButton iconStyle={classes.icon}>
          {props.status ? <CheckCircleIcon fontSize='large'/> : <NotInterestedIcon color='primary'/>}
        </IconButton>
      </Box>
      

    </Card>
  );
}

ReportStatus.propTypes = {
  className: PropTypes.string
};

export default ReportStatus;
