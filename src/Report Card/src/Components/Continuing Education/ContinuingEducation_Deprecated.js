import React from 'react';
import { useStyles } from './styles';
import { cardElevation } from '../../../styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Card, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function ContinuingEducation(props) {
  const classes = useStyles();
  let { ce2020, ce2021 } = props;

  const sortByMonth = (arr) => {
    return arr.sort((a, b) => {
      return a['month'] - b['month'];
    });
  };

  ce2020 = sortByMonth(ce2020);
  ce2021 = sortByMonth(ce2021);

  let upcomingEvents = ce2021.filter(event => {
    return event['Status'] != 'Completed' && !event['Status'].includes('Can')
  })

  let pastEvents = ce2020.concat(ce2021)
  pastEvents = pastEvents.filter(event => {
    return event['Status'].includes('Comp')
  })
  pastEvents = pastEvents.sort((a, b) => {
    return b['month'] - a['month'];
  })

  let completed20 = ce2020.filter(event => event['Status'].includes('Comp')).length
  let completed21 = ce2021.filter(event => event['Status'].includes('Comp')).length

  pastEvents = pastEvents.slice(0, 3)
  return (
    <Box marginTop={3}>
      <Card elevation={0}>
        <Box height={370}>
          <Typography className={classes.title}>
            Continuing Education
          </Typography>
          <Box margin={1}>
            <Box className={classes.overview}>
              <Grid container spacing={4} >
                <Grid item xs={4}>
                  {/*<Card elevation={0} >*/}
                  <Box height={145} padding={2} align={'center'}>
                    <Typography className={classes.overviewText}>Courses in 2020</Typography>
                    <div className={classes.circle}>
                      <div className={classes.center}>
                        <Typography className={classes.display}>{completed20}</Typography>
                      </div>
                    </div>
                  </Box>
                  {/*</Card>*/}
                </Grid>
                <Grid item xs={4}>
                  {/*<Card className={classes.overviewCard} elevation={0} >*/}
                    <Box height={145} padding={2} align={'center'}>
                      <Typography className={classes.overviewText}>Courses in 2021</Typography>
                      <div className={classes.circle}>
                        <div className={classes.center}>
                          <Typography className={classes.display}>{completed21}</Typography>
                        </div>
                      </div>
                    </Box>
                  {/*</Card>*/}
                </Grid>
                <Grid item xs={4}>
                  {/*<Card className={classes.overviewCard} elevation={0} >*/}
                    <Box height={140} padding={1} align={'center'}>
                      <Typography className={classes.overviewText}>Scheduled 2021</Typography>
                      <div className={classes.circle}>
                        <div className={classes.center}>
                          <Typography className={classes.display}>{upcomingEvents.length}</Typography>
                        </div>
                      </div>
                    </Box>
                  {/*</Card>*/}
                </Grid>
              </Grid>
            </Box >
            <Typography className={classes.subtitle}>
              Next Event
            </Typography>
            <TableContainer padding={20}>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>Date</TableCell>
                    <TableCell className={classes.tableHead}>Class</TableCell>
                    <TableCell className={classes.tableHead}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {upcomingEvents.slice(0, 1).map(row => (
                    <TableRow key={row['Date']}>
                      <TableCell className={classes.tableItem}>{row['Date']}</TableCell>
                      <TableCell className={classes.tableItem}>{row['Class']}</TableCell>
                      <TableCell className={classes.tableItem}>{row['Status']}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {/*<Box margin={10} marginTop={'-2rem'}>*/}
          {/*  <Typography className={classes.subtitle}>*/}
          {/*    Recent Events*/}
          {/*  </Typography>*/}
          {/*  <TableContainer  >*/}
          {/*    <Table>*/}
          {/*      <TableHead>*/}
          {/*        <TableRow>*/}
          {/*          <TableCell className={classes.tableHead}>Date</TableCell>*/}
          {/*          <TableCell className={classes.tableHead}>Class</TableCell>*/}
          {/*          <TableCell className={classes.tableHead}>Status</TableCell>*/}
          {/*        </TableRow>*/}
          {/*      </TableHead>*/}
          {/*      <TableBody>*/}
          {/*        {pastEvents.map(row => (*/}
          {/*          <TableRow key={row['Date']}>*/}
          {/*            <TableCell className={classes.tableItem}>{row['Date']}</TableCell>*/}
          {/*            <TableCell className={classes.tableItem}>{row['Class']}</TableCell>*/}
          {/*            <TableCell className={classes.tableItem}>{row['Status']}</TableCell>*/}
          {/*          </TableRow>*/}
          {/*        ))}*/}
          {/*      </TableBody>*/}
          {/*    </Table>*/}
          {/*  </TableContainer>*/}
          {/*</Box>*/}
        </Box>

      </Card>
    </Box>
  );
}
