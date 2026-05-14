
// handles adding, editing and deleting reviews

const express = require('express');
const router  = express.Router();
const Review  = require('../models/Review');
const User    = require('../models/User');

// save a new review
router.post('/add', async (req, res) => {
  try {
    const { movieId, rating, body, userId } = req.body;

    // guard against missing or invalid userId
    if (!userId || userId === 'undefined') return res.redirect('/login');

    const user = await User.findById(userId);
    if (!user) return res.redirect('/login');

    const newReview = new Review({
      movie:      movieId,
      author:     userId,
      authorName: user.name,
      rating:     parseInt(rating),
      body:       body
    });

    await newReview.save();

    res.redirect('/movies/' + movieId + '?userId=' + userId);
  } catch (err) {
    console.log(err);
    res.redirect('/movies');
  }
});

// shows the edit review form
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.query.userId || '';

    if (!userId || userId === 'undefined') return res.redirect('/login');

    const review = await Review.findById(req.params.id).populate('movie');
    if (!review) return res.status(404).send('Review not found.');

    // only the author can edit their review
    if (review.author.toString() !== userId) {
      return res.status(403).send('You can only edit your own reviews.');
    }

    res.render('edit-review', { review, userId, error: null });
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

// saves the edited review
router.post('/:id/edit', async (req, res) => {
  try {
    const { rating, body, userId } = req.body;

    if (!userId || userId === 'undefined') return res.redirect('/login');

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Review not found.');

    if (review.author.toString() !== userId) {
      return res.status(403).send('You can only edit your own reviews.');
    }

    review.rating = parseInt(rating);
    review.body   = body;
    await review.save();

    res.redirect('/movies/' + review.movie + '?userId=' + userId);
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

// delete a review
router.post('/:id/delete', async (req, res) => {
  try {
    const { userId, from } = req.body;

    if (!userId || userId === 'undefined') return res.redirect('/login');

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Review not found.');

    if (review.author.toString() !== userId) {
      return res.status(403).send('You can only delete your own reviews.');
    }

    const movieId = review.movie;
    await Review.findByIdAndDelete(req.params.id);

    if (from === 'dashboard') {
      res.redirect('/dashboard?userId=' + userId);
    } else {
      res.redirect('/movies/' + movieId + '?userId=' + userId);
    }
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

module.exports = router;
