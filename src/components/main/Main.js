import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MainTitle from './MainTitle';
import MainFeaturedPost from './FeaturedPost';

const styles = theme => ({
  layoutGrid: {
    marginTop: '1%',
    marginLeft: '25%',
    marginRight: '25%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0%',
      marginRight: '0%'
    }
  }
});

function Main(props) {
  const { classes } = props;
  return (
    <div className={classes.layout}>
      <MainTitle />
      <div className={classes.layoutGrid}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={12} lg={6}>
            <MainFeaturedPost />
          </Grid>
          <Grid item xs={12} lg={6}>
          </Grid>
        </Grid>
      </div>
    </div>
)}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
