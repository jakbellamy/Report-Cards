import React from 'react';
import { useStyles } from './styles';
import { cardElevation } from '../../../styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Card } from '@material-ui/core';

export default function ContinuingEducation(props) {
  const classes = useStyles();
  let { ce2020, ce2021 } = props;

  const sortByMonth = (arr) => {
    return arr.sort((a, b) => {
      return b['month'] - a['month'];
    });
  };

  ce2020 = sortByMonth(ce2020);
  ce2021 = sortByMonth(ce2021);

  return (
    <Card className={classes.card} elevation={cardElevation}>

      <TableContainer className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ce2021.map(row => (
              <TableRow key={row['Date']}>
                <TableCell component='th' scope='row'>{row['Date']}</TableCell>
                <TableCell>{row['Class']}</TableCell>
                <TableCell>{row['Status']}</TableCell>
              </TableRow>

            ))}
            {ce2020.map(row => (
              <TableRow key={row['Date']}>
                <TableCell component='th' scope='row'>{row['Date']}</TableCell>
                <TableCell>{row['Class']}</TableCell>
                <TableCell>{row['Status']}</TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
