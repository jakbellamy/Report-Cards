import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    marginBottom: '3%'
  },
  difference: {
    marginTop: theme.spacing(1),
    display: 'flex',
    // textAlign: 'right',
  },
  differenceValue: {
    color: props =>
      props.positiveDifference ? theme.palette.success.main : theme.palette.error.main,
    // marginLeft: '5%',
    fontWeight: 'bolder',
    fontSize: '24px',
    marginTop: '-.1rem',
    marginLeft: '-1.5rem',
    marginBottom: '-4rem',
    fontFamily: 'Ubuntu',
    textAlign: 'right',
  },
  top: {
    fontFamily: 'Roboto',
    fontWeight: 'medium',
    fontSize: '16px',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '0 0 0 0'
  },
  altTitle: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '28px',
    margin: '0 0 0 0'
  },
  currentValue: {
    marginRight: '3%'
  },
  center: {
    width: '50%',
    margin: 'auto',
    // padding: '10.5px',
  },
  data: {
    margin: '0 2rem 0 2rem',
  }
}));
