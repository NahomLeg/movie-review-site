// defines what a user looks like in the database

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  // the user's display name
  name: {
    type: String,
    required: true,
    trim: true
  },

  // email must be unique so no two users can share one
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  // the hashed password (btw we never store plain text passwords)
  password: {
    type: String,
    required: true
  },

  // when the account was created
  createdAt: {
    type: Date,
    default: Date.now
  }

});

// exporting so the route files can use this model
module.exports = mongoose.model('User', userSchema);
