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

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
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
  const classes = useStyles();
  const overview = {
    officeVol: props.report ? props.report.office_volume : 0,
    supremeVol: props.report ? props.report.supreme_volume : 0,
    officeUnits: props.report ? props.report.office_units : 0,
    supremeUnits: props.report ? props.report.supreme_units : 0
  };
  const ly = {
    officeVol: props.ly ? props.ly.office_volume : 0,
    supremeVol: props.ly ? props.ly.supreme_volume : 0,
    officeUnits: props.ly ? props.ly.office_units : 0,
    supremeUnits: props.ly ? props.ly.supreme_units : 0
  }
  console.log(ly)
  const calcChange = (name, fixed=2) => {
    console.log(overview[name], ly[name])
    return (((overview[name] - ly[name]) / overview[name])).toFixed(fixed)
    // return ly[name].toFixed(2)
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
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            YTD Office Volume
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {insertCommas(overview.officeVol)}
            </Typography>
            {
              // calcChange('officeVol')
              //     ?
              //   <Label className={classes.label} color="success">{calcChange('officeVol')}%</Label>
              //     :
                <Label className={classes.label} color="error">{ly.officeVol}%</Label>
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
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            YTD Supreme Volume
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              $
              {insertCommas(overview.supremeVol)}
            </Typography>
            {
              calcChange('supremeVol')
                ?
                <Label className={classes.label} color="success">{calcChange('supremeVol')}%</Label>
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
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            YTD Office Units
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {overview.officeUnits}
            </Typography>
            {
              calcChange('officeUnits')
                ?
                <Label className={classes.label} color="success">{calcChange('officeUnits', 0)}</Label>
                :
                <Label className={classes.label} color="error">{calcChange('officeUnits', 0)}</Label>
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
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            YTD Supreme Units
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {overview.supremeUnits}
            </Typography>
            {
              calcChange('supremeUnits')
                ?
                <Label className={classes.label} color="success">{calcChange('supremeUnits', 0)}</Label>
                :
                <Label className={classes.label} color="error">{calcChange('supremeUnits', 0)}</Label>
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
