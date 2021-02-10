import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    marginBottom: '3%'
  },
  difference: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  differenceValue: {
    color: props =>
      props.positiveDifference ? theme.palette.success.main : theme.palette.error.main,
    marginRight: theme.spacing(1),
    marginLeft: '5%'
  },
  title: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    marginLeft: '5%'
  },
  currentValue: {
    marginRight: '3%'
  }
}));
