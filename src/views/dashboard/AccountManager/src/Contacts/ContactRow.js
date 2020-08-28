import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'

function ContactRow(props) {
  return(
    <Grid container spacing={0}>
      <Grid item xs={2}>
        <Typography variant='subtitle1' align={'left'}>
          {props.role ? props.role : ''}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant='subtitle1' align={'left'}>
          {props.name ? props.name : ''}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='subtitle1' align={'left'}>
          {props.email ? props.email : ''}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant='subtitle1' align={'left'}>
          {props.phone ? props.phone : ''}
        </Typography>
      </Grid>
    </Grid>
  )
}

ContactRow.propTypes = {
  role: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string
}

export default ContactRow;
