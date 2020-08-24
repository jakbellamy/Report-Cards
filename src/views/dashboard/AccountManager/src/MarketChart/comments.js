import React from 'react';
import { Box, CardHeader, Divider, makeStyles, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Chart from './Chart';
import PropTypes from 'prop-types';
import CompareLineChart from './index';

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
  const handleClose = () => setOpen(false);

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
    handleClose()
  }
  console.log('CURRENT', props.current)
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ADD COMMENT
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Save a new comment for this account's most recent report.
          </DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Comment" multiline rows={4} variant="outlined" fullWidth
          onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function Comment(props) {
  if(props.current?.comment){
    return <Typography>{props.current.comment}</Typography>
  } else {
    return <NewComment current={props.current ? props.current: {}}/>
  }
}

function Comments(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Box
      className={clsx(classes.root, className)}
      {...rest}
      p={3}
      position="relative"
      minHeight={140}
    >
      <Divider />
      <CardHeader title="Comments"/>
      <Comment current={props.current ? props.current: {}} />
    </Box>
  );
}

Comments.propTypes = {
  className: PropTypes.string
};

export default Comments;
