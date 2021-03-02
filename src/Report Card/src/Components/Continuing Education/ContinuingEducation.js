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
    <Box >
      <Card elevation={0}>
        <Box height={270}>
          <Grid container spacing={10}>
            <Grid item xs={upcomingEvents.length ? 6 : 12}>
              <Box margin={4} height={200}>
                <Box className={classes.overview}>
                  <Grid container spacing={4} align='center'>
                    <Grid item xs={4}>
                      <Typography className={classes.overviewText}>Courses in 2020</Typography>
                      <Card elevation={1} className={classes.overviewCard}>
                        <Box height={200} padding={2} align={'center'}>
                          <Typography className={classes.display}>{completed20}</Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.overviewText}>Courses in 2021</Typography>
                      <Card className={classes.overviewCard} elevation={1} >
                        <Box height={200} padding={2} align={'center'}>
                          <Typography className={classes.display}>{completed21}</Typography>
                        </Box>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.overviewText}>Scheduled 2021</Typography>
                      <Card className={classes.overviewCard} elevation={1} >
                        <Box height={200} padding={1} align={'center'}>
                          <Typography className={classes.display}>{upcomingEvents.length}</Typography>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </Box >
            </Grid>
            <Grid item xs={upcomingEvents.length ? 6 : 0}>
              {upcomingEvents.length ? (
                <Box marginBottom={'-.8rem'}>
                  <Typography className={classes.subtitle}>
                    Next Event
                  </Typography>
                  <Box marginTop={4}>
                    <TableContainer padding={20} >
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

                </Box>
              ) : null}
            </Grid>
          </Grid>


          {/*</Box>*/}
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
          </Box>

      </Card>
    </Box>
  );
}
