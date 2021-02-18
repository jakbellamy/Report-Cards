import React from 'react';
import { useStyles } from './styles';
import CenteredImage from '../_Modules/centeredImage';
import { upcomingBestImageURL, variableBestTagline } from '../../../data/constants';
import { Box, CardHeader, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { cardElevation } from '../../../styles';


export default function UpcomingBest(props) {
  const classes = useStyles();
  return (
    <Box className={classes.upcomingBestRoot}>
      <Card className={classes.upcomingBestCard} elevation={cardElevation}>
          <CardHeader
            className={classes.upcomingBestTitle}
            title = {
              <Box>
                <Typography gutterBottom variant="h3" component="h1" className={classes.title}>
                  Personal & Professional BEST
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="h1" className={classes.subtitle}>
                  {variableBestTagline}
                </Typography>
              </Box>
            }
          />
        <Box padding={3} paddingTop={0}>
          <CenteredImage src={upcomingBestImageURL} height={'290'}/>
        </Box>f
    </Box>
  );
}
