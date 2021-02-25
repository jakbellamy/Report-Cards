import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableHead: {
    fontSize: '20px'
  },
  tableItem: {
    fontSize: '23px'
  },
  card: {
    marginTop: '2.5%',

  },
  title: {
    // textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
    margin: '0 -4rem 0',
    color: 'White',
    backgroundColor: '#7A9EDB',
    textAlign: 'center',
    borderRadius: '10em 10em 10em'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '28px',
    marginLeft: '3rem',
    marginRight: '3rem',
    color: 'rgba(35,39,50,0.93)',
    marginTop: '25px',
    textAlign: 'center',
    backgroundColor: '#d4deea',
    borderRadius: '30em 30em 60em 60em'
  },
  display: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
    marginTop: '5px',
    // color: '#7A8BF8',
    color: 'white',
    margin: '-4rem -4rem -4rem -4rem'
  },
  overviewText: {
    fontWeight: 'bold',
    fontSize: '21px',
    textAlign: 'center',
    paddingBottom: '10px'
  },
  overview: {
    margin: '0 -2.5rem 1rem -2.5rem',
  },
  circle: {
    borderRadius: '100%',
    backgroundColor: '#7A9EDB',
    height: '85px',
    width: '85px',

  },
  center: {
    width: '50%',
    margin: 'auto',
    padding: '10.5px',
  }
}));
