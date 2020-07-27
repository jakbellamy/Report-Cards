import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Button, Grid, Link, Menu, MenuItem, SvgIcon, Typography, InputLabel, FormControl, Select, makeStyles } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header(props, {  ...rest }) {
  const classes = useStyles();
  const actionRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    let account = e.target.value
    props.setSelectedAccount(account)
  }
  console.log(props.accounts)
  return (
    <Grid container justify="space-between" spacing={3}{...rest}>
      <Grid item>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link variant="body1" color="inherit" to="/app" component={RouterLink}>
            Dashboard
          </Link>
          <Typography variant="body1" color="textPrimary">
            Accounts
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          {props.selectedAccount.name}
        </Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel>Account</InputLabel>
          <Select value={props.selectedAccount} onChange={handleChange}>
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
