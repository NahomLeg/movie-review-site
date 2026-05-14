// defines what a review looks like in the database

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

  // which movie this review is for
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },

  // who wrote the review
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // author's name stored here so we don't need an extra DB call to display it
  authorName: {
    type: String,
    required: true
  },

  // rating from 1 to 5
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },

  // the written review text
  body: {
    type: String,
    required: true,
    trim: true
  },

  // when the review was written
  createdAt: {
    type: Date,
    default: Date.now
  }

});

// exporting so the route files can use this model
module.exports = mongoose.model('Review', reviewSchema);
