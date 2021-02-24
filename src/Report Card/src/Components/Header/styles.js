import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  div: {
    paddingTop: 20,
    marginLeft: 25,
    marginBottom: -15,
    paddingLeft: '65px'
  },
  logoBox: {
    marginTop: '4%'
  },
  accountHeader: {
    fontSize: '80px',
    fontWeight: 'bold',
    fontFamily: 'Open Sans'
  },
  date: {
    fontSize: '36px',
    fontWeight: 'medium',
    fontFamily: 'Open Sans'
  }
}));
