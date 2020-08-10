import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2.5)
  },
}));

function PersonalBest(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Personal & Professional Best"/>
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={320}>

        {/*<Divider />*/}
      </Box>


    </Card>
  );
}

PersonalBest.propTypes = {
  className: PropTypes.string
};

export default PersonalBest;
