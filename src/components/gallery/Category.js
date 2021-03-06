import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../../Firebase';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

import makeCancelablePromise from '../helperFunctions/makeCancelablePromise';
import ModalImages from './ModalImages';

const styles = theme => ({
  root: {
    paddingTop: 30,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 5,
    }
  },
  gridItem: {
    padding: '45px 0px 45px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: 8,
    }
  },
  category: {
    marginTop: 20,
    fontFamily: 'Great Vibes, cursive',
    fontSize: 56,
    textTransform: 'capitalize'
  },
  card: {
    margin: 'auto',
    '&:hover': {
      opacity: 0.8,
    },
    maxWidth: 400,
    borderRadius: 6,
  },
  cardContent: {
    backgroundColor: '#f5f5f5'
  },
  media: {
    height: 250,
  }
});

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      openModal: false,
      index: 0
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(e) {
    const index = Number(e.target.dataset.index);
    this.setState({
      openModal: true,
      index: index,
    });
  }

  handleClose = () => {
    this.setState({ openModal: false });
  };

  fetchImages = makeCancelablePromise(new Promise((resolve, reject) => {
    const { category } = this.props.match.params;
    const db = firebase.firestore();

    db.collection('images').where('category', '==', category).get().then((snapshot) => {
      if (snapshot.empty) reject('There are no documents in the query snapshot');
      let imagesData = [];

      snapshot.forEach((doc) => {
        const { id, name, url, thumbUrl, category, description } = doc.data();
        imagesData.push({ id, name, url, thumbUrl, category, description });
      });

      resolve(imagesData);
    });
  }));

  componentDidMount() {
    this.fetchImages
      .promise
      .then((imagesData) => {
        this.setState({
          images: imagesData
        });
      })
      .catch((reason) => console.log('isCanceled', reason.isCanceled));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hasOwnProperty('match') && prevProps.match.params.category !== this.props.match.params.category) {
      this.setImageSource();
    }
  }

  componentWillUnmount() {
    this.fetchImages.cancel();
  }

  render() {
    const { images, openModal, index } = this.state;
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.category} gutterBottom variant="h4" align="center">
          {match.params.category}
        </Typography>
        <Grid container spacing={0} justify="center">
          {images.map((data, index) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={data.id} className={classes.gridItem}>
                <Card className={classes.card} about={data.category.toLowerCase()}>
                  <CardMedia
                    className={classes.media}
                    image={data.thumbUrl}
                    data-index={index}
                    title={data.name}
                    onClick={this.handleOpen}
                  />
                </Card>
              </Grid>
            )
          })}
        </Grid>
        {images.length !== 0 && openModal ?
          <ModalImages images={images} match={match} openModal={openModal} handleClose={this.handleClose} index={index} /> : null}
      </div>
    )
  }
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);
