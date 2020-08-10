import React from 'react';
import { Box, Card, CardHeader, Divider, ListSubheader, makeStyles, Button, GridList, GridListTile } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // marginTop: theme.spacing(-1),

    // width: 500,
    // height: 450,
  },
}));

function Volume(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <GridList cellHeight={30} className={classes.gridList}>
        <GridListTile >
          <ListSubheader component="div">YTD Volume</ListSubheader>
        </GridListTile>
      </GridList>
      <GridList cellHeight={70} className={classes.gridList} cols={2}>
        <GridListTile >

        </GridListTile>
        <GridListTile >

        </GridListTile>
      </GridList>
      <GridList cellHeight={70} className={classes.gridList} cols={2}>
        <GridListTile >

        </GridListTile>
        <GridListTile >
        </GridListTile>
      </GridList>



    </Card>
  );
}

Volume.propTypes = {
  className: PropTypes.string
};

export default Volume;
