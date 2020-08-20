import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
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
        minHeight={220}>

      </Box>


    </Card>
  );
}

ReportStatus.propTypes = {
  className: PropTypes.string
};

export default ReportStatus;
