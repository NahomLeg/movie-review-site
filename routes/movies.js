
// handles the browse page with search and genre filtering
// and the movie detail page where users can read and write reviews


const express = require('express');
const router  = express.Router();
const Movie   = require('../models/Movie');
const Review  = require('../models/Review');

// GET /movies - browse page with search and genre filter
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const genre  = req.query.genre  || '';
    const userId = req.query.userId || '';

    let movies = await Movie.find();

    // filter by title
    if (search.trim() !== '') {
      const searchLower = search.toLowerCase();
      movies = movies.filter(function (movie) {
        return movie.title.toLowerCase().includes(searchLower);
      });
    }

    // filter by genre
    if (genre.trim() !== '') {
      const genreLower = genre.toLowerCase();
      movies = movies.filter(function (movie) {
        return movie.genre.toLowerCase().includes(genreLower);
      });
    }

    res.render('browse', { movies, search, genre, userId });

  } catch (err) {
    console.log(err);
    res.render('browse', { movies: [], search: '', genre: '', userId: '' });
  }
});

// GET /movies/:id - single movie detail page
router.get('/:id', async (req, res) => {
  try {
    const userId = req.query.userId || '';

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).render('404', { message: 'Movie not found.', userId: '' });
    }

    // get all reviews for this movie, sorted by newest first
    const reviews = await Review.find({ movie: movie._id }).sort({ createdAt: -1 });

    // check if this user already reviewed this movie
    let userReview = null;
    if (userId && userId !== 'undefined') {
      userReview = reviews.find(function (r) {
        return r.author.toString() === userId;
      });
    }

    res.render('movie-detail', { movie, reviews, userId, userReview });
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = router;
