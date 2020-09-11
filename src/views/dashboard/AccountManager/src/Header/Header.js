import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Menu, MenuItem, Typography, makeStyles } from '@material-ui/core';

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

  const filterButton = () => {
    if(!props.admin){
      return (
      <Button onClick={() => props.handleToggle()}>
        {props.filterToggle ? <img src="https://img.icons8.com/ios-glyphs/30/000000/clear-filters.png"/> : <img src="https://img.icons8.com/ios-glyphs/30/000000/filter.png"/>}
      </Button>)
    } else {
      return null
    }
  }

  let thruDate = props.current.date ? `Production Data Updated Through July 2020` : ''
  return (
    <>
    <Grid container spacing={1}{...rest}>
      <Grid item xs={7}>
        <Typography variant="h4">
          {thruDate}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={handleClick}>
          <Typography
            variant="h5" color="#FFFFFE">
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
        {filterButton()}
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
