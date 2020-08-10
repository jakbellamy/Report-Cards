import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  },
}));

function ContinuingEducation(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Continuing Education"/>
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={228}>

        {/*<Divider />*/}
      </Box>


    </Card>
  );
}

ContinuingEducation.propTypes = {
  className: PropTypes.string
};

export default ContinuingEducation;
