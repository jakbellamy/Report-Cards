import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  scrollable: {
    height: 145,
    overflow: 'hidden'
  }
}));

export default function TopicsList(props) {
  const classes = useStyles();

  function displayTopics(topics) {
    return topics.map((topic, index) => (
      <ListItem>
        <ListItemText primary={`${index + 1}. ${topic}`} />
      </ListItem>
    ));
  }

  return (
    <Box className={classes.root}>
      <Typography variant={"h5"} align={'center'}>Topics Trained</Typography>
      <Box className={classes.scrollable} borderLeft={1}>
        <List component="nav" aria-label="secondary mailbox folders">
          {displayTopics(props.topics)}
        </List>
      </Box>
    </Box>
  );
}
