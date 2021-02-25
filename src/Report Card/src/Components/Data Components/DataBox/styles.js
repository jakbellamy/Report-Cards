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
    fontSize: '40px',
    marginRight: '1rem',
    fontFamily: 'Ubuntu'
  },
  top: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bolder',
    fontSize: '33px',
    margin: '-.7rem 0 0 '
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
