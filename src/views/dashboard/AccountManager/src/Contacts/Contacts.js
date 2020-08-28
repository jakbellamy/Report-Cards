import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ContactRow from './ContactRow'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

function Contacts(props, { className, ...rest }) {
  const classes = useStyles();


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Key Contacts"/>
      <Divider />
      <Box p={3} position="relative" minHeight={220}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Typography variant='h5' align={'left'}>Role</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h5' align={'left'}>Name</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h5' align={'left'}>Email</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='h5' align={'left'}>Phone Number</Typography>
          </Grid>
        </Grid>
        <ContactRow
          role={'Owner'}
          name={'Gene Whiddon'}
          email={'genewhiddon@bhgfirst.com'}
          phone={'(954) 525-2200'}
        />
        <ContactRow
          role={'Team Leader'}
          name={''}
          email={''}
          phone={''}
        />
        <ContactRow
          role={'Asst Team Leader'}
          name={''}
          email={''}
          phone={''}
        />
        <ContactRow
          role={'MCA/Admin'}
          name={''}
          email={''}
          phone={''}
        />
        <ContactRow
          role={'Productivity Coach'}
          name={''}
          email={''}
          phone={''}
        />
      </Box>


    </Card>
  );
}

Contacts.propTypes = {
  className: PropTypes.string
};

export default Contacts;
