import { makeStyles } from '@material-ui/core';

export const useStyles = () => {
  return makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      minWidth: '100%'
    },
    container: {
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 64,
        paddingRight: 64
      }
    },
    ceTitle:{
      fontWeight: 'bold',
      fontSize: 90
    },
    text: {
      flexWrap: 'wrap',
      maxWidth: '260px',
      margin: '0 -5rem 1rem -5rem'
    }
  }))
}

export const cardElevation = 0
// export const mainBackgroundColor = '#F4F5F5'
export const mainBackgroundColor = '#F5F7FB'

