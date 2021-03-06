import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MainTitle from './MainTitle';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

function Main(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center">
        <Grid item xs={12}>
          <MainTitle />
        </Grid>
      </Grid>
    </div>
)}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
