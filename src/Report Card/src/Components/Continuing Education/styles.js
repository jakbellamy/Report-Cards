import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  tableHead: {
    fontSize: '20px'
  },
  tableItem: {
    fontSize: '18px'
  },
  card: {
    marginTop: '2.5%'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '34px',
    margin: '25px 0 -4rem 0'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '28px',
    textAlign: 'left',
    marginLeft: '5px',
    color: '#4C4C4C',
    marginBottom: '10px'
  },
  display: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '50px',
    marginTop: '5px',
    color: '#4D94C8',
    // margin: '25px 0 -4rem 0'
  },
  overviewText: {
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center'
  },
  overview: {
    margin: '0 -2.5rem 0rem -2.5rem',
  },
  overviewCard: {
    borderRadius: 30,
  },
}));
