import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Title from '../_Components/Title'
import SimpleList from '../_Components/SimpleList'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

function Education(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Continuing Education"/>
      <Divider />
      <Box paddingTop={1} paddingLeft={3} position="relative" minHeight={150}>
        <Title text={props.account.agent_count ? "This Year": ''} variant={'h4'} align={'left'} height={1}/>
        <Box position={'relative'} height={105}>
          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true} height={1}
             text={['Number of Events', '0']}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true} height={1}
            text={['Number of Agents Trained', '0']}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true} height={1}
             text={['Topics Trained', '']}/>
            : null}
        </Box>
      </Box>
      <Box paddingTop={1} paddingLeft={3} position="relative" minHeight={160}>
        <Title text={props.account.agent_count ? "Last Year": ''} variant={'h4'} align={'left'} height={1}/>
        <Box position={'relative'} height={105}>
          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true} height={1}
                                                   text={['Number of Events', '0']}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true} height={1}
                                                   text={['Number of Agents Trained', '0']}/>
            : null}
          {props.account.agent_count ? <SimpleList variant='subtitle1' noShift={true} height={1}
                                                   text={['Topics Trained', '']}/>
            : null}
        </Box>
      </Box>

    </Card>
  );
}

Education.propTypes = {
  className: PropTypes.string
};

export default Education;
