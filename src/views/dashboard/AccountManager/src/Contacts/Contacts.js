import React from 'react';
import { Box, Card, CardHeader, Divider, makeStyles, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ContactRow from './ContactRow'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  },
}));

function Contacts(props, { className, ...rest }) {
  const classes = useStyles();

  let shell = {
    name: '',
    email: '',
    phone: ''
  }

  let owner = props.account.owners && props.account.owners[0] ? props.account.owners[0] : shell
  let owner2 = props.account.owners && props.account.owners[1] ? props.account.owners[1] : shell
  let teamLeader = props.account.team_leader ? props.account.team_leader : shell
  let assistantTeamLeader = props.account.assistant_team_leader ? props.account.assistant_team_leader : shell
  let mca = props.account.mca ? props.account.mca : shell
  let assistantMca = props.account.assistantMca ? props.account.assistantMca : shell
  let productivityCoach = props.account.productivity_coach ? props.account.productivity_coach : shell

  return <Card
    className={clsx(classes.root, className)}
    {...rest}
  >
    <CardHeader title="Key Contacts"/>
    <Divider />
    <Box p={3} position="relative" minHeight={220}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography variant='h5' align={'left'}>Role</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' align={'left'}>Name</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' align={'left'}>Email</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h5' align={'left'}>Phone Number</Typography>
        </Grid>
      </Grid>
      <ContactRow
        role={'Owner/OP'}
        name={owner.name}
        email={owner.email}
        phone={owner.phone}
      />
      {owner2.name ? <ContactRow role={'Owner/OP'} name={owner2.name} email={owner2.email} phone={owner2.phone} /> : null}
      <ContactRow
        role={'Team Lead/Broker'}
        name={teamLeader.name}
        email={teamLeader.email}
        phone={teamLeader.phone}
      />
      <ContactRow
        role={'Asst Team Lead/Broker'}
        name={assistantTeamLeader.name}
        email={assistantTeamLeader.email}
        phone={assistantTeamLeader.phone}
      />
      <ContactRow
        role={'MCA/Admin'}
        name={mca.name}
        email={mca.email}
        phone={mca.phone}
      />
      {assistantMca.name ? <ContactRow role={'Asst MCA/Admin'} name={assistantMca.name} phone={assistantMca.phone} email={assistantMca.email}/> : null}
      <ContactRow
        role={'Productivity Coach'}
        name={productivityCoach.name}
        email={productivityCoach.email}
        phone={productivityCoach.phone}
      />
      {props.account.loan_officers?.map(lo => {
        return <ContactRow
          role={'Loan Officer'}
          name={lo.name}
          email={lo.email}
          phone={lo.phone}
        />
      })}
    </Box>


  </Card>;
}

Contacts.propTypes = {
  className: PropTypes.string
};

export default Contacts;
