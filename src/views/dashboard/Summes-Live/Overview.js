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
    officeVol: 12877700,
    supremeVol: 4457800,
    officeUnits: 37,
    supremeUnits: 16
  };
  const ly = {
    officeVol: 25587090,
    supremeVol: 4308800,
    officeUnits: 64,
    supremeUnits: 14
  }
  const calcChange = (name, fixed=2) => {
    return ((((ly[name] - overview[name]) / overview[name]) * 100) - 100).toFixed(fixed)
  }
  const insertCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  console.log(props.report)
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
              calcChange('officeVol') >= 0
                  ?
                <Label className={classes.label} color="success">{calcChange('officeVol')}%</Label>
                  :
                <Label className={classes.label} color="error">{calcChange('officeVol')}%</Label>
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
              calcChange('supremeVol') >= 0
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
              calcChange('officeUnits') >= 0
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
              calcChange('supremeUnits') >= 0
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
