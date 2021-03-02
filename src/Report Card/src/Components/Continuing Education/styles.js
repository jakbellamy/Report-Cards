import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableHead: {
    fontSize: '20px'
  },
  tableItem: {
    fontSize: 'zpx'
  },
  card: {
    marginTop: '2.5%',
  },
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    fontFamily: 'Fira Sans',
    margin: '1.5rem 0 0 0',
    textAlign: 'center'
  },

  subtitle: {
    fontWeight: 'bold',
    fontSize: '35px',
    position: 'relative',
    fontFamily: 'Fira Sans',
    marginLeft: '1rem',
    marginRight: '3rem',
    color: 'rgba(35,39,50,0.93)',
    marginTop: '10px',
    textAlign: 'center',
    // backgroundColor: '#d4deea',
    // borderRadius: '30em 30em 60em 60em'
  },
  display: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '40px',
    marginTop: '20%',
    // color: 'white',
  },
  overviewCard: {
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    margin: 'auto',
    height: '110px',
    width: '110px',
    marginTop: '5%',

  },
  overviewText: {
    fontWeight: 'bold',
    fontSize: '26px',
    fontFamily: 'roboto',
    textAlign: 'center',


  },
  overview: {
    paddingTop: '10px',
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

