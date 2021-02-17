import React from 'react';
import { Box, CardHeader, Divider, makeStyles, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MarketShareChart from './charts/MarketShareChart';
import PropTypes from 'prop-types';
import DataChart from './DataCharts';
import Grid from '@material-ui/core/Grid';
import GenericMoreButton from '../../../src/components/GenericMoreButton';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));
function NewComment(props, { className, ...res}) {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState('')

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setComment('')
    setOpen(false);
  }

  const handleSubmit = () => {
    fetch(`https://djsupreme.herokuapp.com/api/market-share-reports/${props.current.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'comment': comment
      })
    })
    props.setCurrent({...props.current, 'comment': comment})
    setComment(comment)
    handleClose()
  }

  const handleDelete = () => {
    let noComment = ''
    fetch(`https://djsupreme.herokuapp.com/api/market-share-reports/${props.current.id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'comment': noComment
      })
    })
    props.setCurrent({...props.current, 'comment': noComment})
    setComment(noComment)
    handleClose()
  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {props.button}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Save a new comment for this account's most recent report.
          </DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Comment" multiline rows={4} variant="outlined" fullWidth defaultValue={props.initValue ? props.initValue : ''} delete={true}
          onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="primary">Delete</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function ExistingComment(props){
  return(
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <Typography>{props.current.comment}</Typography>
      </Grid>
      <Grid item xs={4}>
        <NewComment button={'Edit Comment'} current={props.current ? props.current : {}} setCurrent={props.setCurrent} initValue={props.current.comment}/>
      </Grid>
    </Grid>
    );
}

function Comment(props) {
  if(!props.current.id){
    return ''
  }
  if(props.current?.comment){
    return <ExistingComment current={props.current ? props.current : {}} setCurrent={props.setCurrent}/>
  } else {
    return <NewComment button={'New Comment'} current={props.current ? props.current: {}} setCurrent={props.setCurrent}/>
  }
}

function Comments(props) {
  return (
    <Box
      p={3}
      position="relative"
      minHeight={140}
    >
      <Divider />
      <CardHeader title="Comments" action={<GenericMoreButton htmlID={props.htmlID}/>}/>
      <Comment current={props.current ? props.current: {}} setCurrent={props.setCurrent}/>
    </Box>
  );
}

Comments.propTypes = {
  className: PropTypes.string
};

export default Comments;
