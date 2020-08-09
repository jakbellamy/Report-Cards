import React, { useRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Button, Grid, Link, Menu, MenuItem, SvgIcon, Typography, InputLabel, FormControl, Select, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  info: {
    marginLeft: theme.spacing(2),
  }
}));

function Header(props, {  ...rest }) {
  const classes = useStyles();

  return (
    <Grid container justify="space-between" spacing={3}{...rest}>
      <Grid item className={classes.info}>
        <Button>
          <Typography variant="h4" color="textPrimary" onClick={() => console.log('clicked')}>
            {props.selectedAccount.name}
          </Typography>
        </Button>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Account</InputLabel>
          <Select value={props.selectedAccount} onChange={(e) => props.setSelectedAccount(e.target.value)}>
            {props.accounts.map((t) => (
              <MenuItem value={t}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  // className: PropTypes.string
};

Header.defaultProps = {};

export default Header;
