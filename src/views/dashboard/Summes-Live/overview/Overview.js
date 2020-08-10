import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import Volume from './volume'
import Units from './units'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  item: {
    padding: theme.spacing(4),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

function Overview(props, { className, ...rest }) {
  console.log(props.thisMonth)
  const classes = useStyles();
  const overview = {
    officeVol: props.thisMonth.office_volume || 0,
    supremeVol: props.thisMonth.supreme_volume || 0,
    officeUnits: props.thisMonth.office_units || 0,
    supremeUnits: props.thisMonth.supreme_units || 0
  };
  let retro = props.lastYear[props.thisMonth.month]
  const ly = {
    officeVol: retro ? retro.office_volume : 0,
    supremeVol: retro ? retro.supreme_volume : 0,
    officeUnits: retro ?retro.office_units : 0,
    supremeUnits: retro ?retro.supreme_units : 0
  }
  console.log('overview', ly, props.thisMonth)
  const calcChange = (name) => {
    let sv1 = overview[name] - ly[name]
    let sv2 = sv1 / overview[name]
    return (sv2 * 100).toFixed(2)
  }
  const insertCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  props.report ? console.log(new Date(props.report.date).getMonth()) : console.log('waiting...')
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        // alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={6}
        >
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Office Volume
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              $
              {insertCommas(overview.officeVol)}
            </Typography>
            {
              overview.officeVol - ly.officeVol >= 0
                  ?
                <Label className={classes.label} color="success">+{calcChange('officeVol')}%</Label>
                  :
                <Label className={classes.label} color="error">{calcChange('officeVol')}%</Label>
            }
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={0}
          xs={6}
        >
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Supreme Volume
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              $
              {insertCommas(overview.supremeVol)}
            </Typography>
            {
              overview.supremeVol - ly.supremeVol >= 0
                ?
                <Label className={classes.label} color="success">+{calcChange('supremeVol')}%</Label>
                :
                <Label className={classes.label} color="error">{calcChange('supremeVol')}%</Label>
            }
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={6}
        >
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Office Units
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {overview.officeUnits}
            </Typography>
            {
              overview.officeUnits - ly.officeUnits >= 0
                ?
                <Label className={classes.label} color="success">+{overview.officeUnits - ly.officeUnits}</Label>
                :
                <Label className={classes.label} color="error">{overview.officeUnits - ly.officeUnits}</Label>
            }
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Supreme Units
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {overview.supremeUnits}
            </Typography>
            {
              overview.supremeUnits - ly.supremeUnits >= 0
                ?
                <Label className={classes.label} color="success">+{overview.supremeUnits - ly.supremeUnits}</Label>
                :
                <Label className={classes.label} color="error">{overview.supremeUnits - ly.supremeUnits}</Label>
            }
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
