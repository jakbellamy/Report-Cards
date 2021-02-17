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
    }
  }))
}

export const cardElevation = 1
// export const mainBackgroundColor = '#F4F5F5'
export const mainBackgroundColor = '#F5F7FB'

