// handles register, login, logout, homepage and dashboard

const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcrypt');
const User     = require('../models/User');
const Movie    = require('../models/Movie');
const Review   = require('../models/Review');

// GET / - homepage
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || '';
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(4);
    res.render('index', { movies, userId });
  } catch (err) {
    console.log(err);
    res.render('index', { movies: [], userId: '' }); // render homepage with empty stuff so server doesnt crash 
  }
});

// GET /register - show registration form
router.get('/register', (req, res) => {
  res.render('register', { error: null, userId: '' });
});

// POST /register - save a new user to the database
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    //1st check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.render('register', { error: 'Passwords do not match.', userId: '' });
    }

    // check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', { error: 'That email is already registered.', userId: '' });
    }

    // hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // after registering send user to login
    res.redirect('/login');

  } catch (err) {
    console.log(err);
    res.render('register', { error: 'Something went wrong. Please try again.', userId: '' });
  }
});

// GET /login - show the login form
router.get('/login', (req, res) => {
  res.render('login', { error: null, userId: '' });
});

// POST /login - check credentials and redirect with userId in URL
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password.', userId: '' });
    }

    // compare if passwords match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render('login', { error: 'Invalid email or password.', userId: '' });
    }

    // login successful — redirect to dashboard with userId in the URL
    res.redirect('/dashboard?userId=' + user._id);

  } catch (err) {
    console.log(err);
    res.render('login', { error: 'Something went wrong. Please try again.', userId: '' });
  }
});

// GET /logout - redirect to homepage
router.get('/logout', (req, res) => {
  res.redirect('/');
});

// GET /dashboard - user's personal page
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.query.userId || '';

    // if no userId send to login
    if (!userId || userId === 'undefined') return res.redirect('/login');

    // double check if userId is valid
    const user = await User.findById(userId);
    if (!user) return res.redirect('/login');

    // get all reviews by this user
    const myReviews = await Review.find({ author: userId })
      .populate('movie', 'title')
      .sort({ createdAt: -1 });

    res.render('dashboard', { user, myReviews, userId });
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
});

module.exports = router;
