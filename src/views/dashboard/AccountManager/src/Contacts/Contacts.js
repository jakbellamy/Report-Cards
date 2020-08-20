import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

function Contacts(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Key Education"/>
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={220}>

      </Box>


    </Card>
  );
}

Contacts.propTypes = {
  className: PropTypes.string
};

export default Contacts;
