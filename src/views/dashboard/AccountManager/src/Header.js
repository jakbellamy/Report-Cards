import React, { useRef, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Breadcrumbs, Button, Grid, Link, Menu, MenuItem, SvgIcon, Typography, InputLabel, FormControl, Select, makeStyles } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  info: {
    marginLeft: theme.spacing(1),
  }
}));

function Header(props, {  ...rest }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (e) => {
    if(!isOpen){
      setIsOpen(true)
      setAnchorEl(e.target);
    } else {
      setIsOpen(false)
      handleClose()
    }
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const chooseAccount = (t) => {
    props.setSelectedAccount(t)
  }

  return (
    <>
    <Grid container spacing={7}{...rest}>
      <Grid item >
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={handleClick}>
          <Typography
            variant="h5" color="#FFFFFE" onClick={() => console.log('clicked')}>
            {props.selectedAccount.name}
          </Typography>
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          onClick={(e) => handleClick(e)}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          color='#FFFFFE'
        >
          {props.accounts.map((t) => (
            <StyledMenuItem value={t} onClick={() => chooseAccount(t)}>
              {t.name}
            </StyledMenuItem>
          ))}
        </StyledMenu>
      </Grid>
      <Grid item>
        {/*<Typography>*/}
        {/*  {props.date}*/}
        {/*</Typography>*/}
      </Grid>
    </Grid>
    </>
  );
}

Header.propTypes = {
  // className: PropTypes.string
};

Header.defaultProps = {};

export default Header;
