import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  }
}));

function LoanOfficers(props, { className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Loan Officers"/>
      <Divider />
      <Box
        p={3}
        position="relative"
        minHeight={220}
        alignContent='center'>

        {props.account.loan_officers?.map((loanOfficer, i) => {
          return (<Box paddingBottom={1}>
            <Grid container>
              <Grid item xs={2}>
                <Typography>
                  {`${i+1}.`}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography>
                  {loanOfficer.name}
                </Typography>
              </Grid>
            </Grid>
          </Box>)
        })}
      </Box>


    </Card>
  );
}

LoanOfficers.propTypes = {
  className: PropTypes.string
};

export default LoanOfficers;

// <Typography>{`${i+1} ${loanOfficer.name}`}</Typography>
