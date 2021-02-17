import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Avatar, Button, Box, Container, Card, CardContent, CardMedia, Divider, Link, Typography, colors, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import LockIcon from '@material-ui/icons/Lock';
import Page from 'src/src/components/Page';
import OPEN_Logo from 'src/src/components/OPEN_Logo';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80
  },
  backButton: {
    marginLeft: theme.spacing(2)
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  icon: {
    backgroundColor: colors.green[500],
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64
  }
}));

function LoginView() {
  const [cookie, setCookie] = useState()
  const classes = useStyles();
  const history = useHistory();

  const handleSubmitSuccess = () => {
    history.push('/app');
  };

  const auth = () => {
    console.log(cookie)
    fetch('https://djsupreme.herokuapp.com/auth/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookie
      },
      body: JSON.stringify({
        'username': 'jakbellamy',
        'password': 'admin'
      }),
    })
  }

  useEffect(() => {
    // const csrftoken = ;
    setCookie(Cookies.get('csrftoken'))
    fetch('https://djsupreme.herokuapp.com/login/?next=/')
      .then(res => console.log(res.headers['set-cookie']))
      .then(setCookie(Cookies.get('csrftoken')))
      .then(auth())
      .then(console.log(cookie))
  }, []);

  // console.log(cookie)
  return (
    <Page className={classes.root} title="Login">
      <Container maxWidth="sm">
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography
              variant="h2"
              color="textPrimary"
            >
              Sign in
            </Typography>
            {/*<Typography*/}
            {/*  variant="subtitle1"*/}
            {/*  color="textSecondary"*/}
            {/*>*/}
            {/*  Sign in on the internal platform*/}
            {/*</Typography>*/}
            <Box mt={3}>
              <LoginForm onSubmitSuccess={handleSubmitSuccess} />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default LoginView;
