// load the .env file so we can use process.env variables
require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');

const app = express();

// connects to MongoDB Atlas using the connection string from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// set pug as the template engine
app.set('view engine', 'pug');
//where to find the pug template files
app.set('views', './views');

// middleware
// parses form data sent from HTML forms and puts it in req.body
app.use(express.urlencoded({ extended: true }));

// serves the static files from the public folder
app.use(express.static('public'));

// loads route files
const authRoutes   = require('./routes/auth');
const movieRoutes  = require('./routes/movies');
const reviewRoutes = require('./routes/reviews');

// attach routes to the app
app.use('/', authRoutes);
app.use('/movies', movieRoutes);
app.use('/reviews', reviewRoutes);

// starts the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CineReview running at http://localhost:${PORT}`));
