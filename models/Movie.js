// defines what a movie looks like in the database
// also loads all the movies in when the server starts for the first time


const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  // basic info about the movie
  title: {
    type: String,
    required: true,
    trim: true
  },

  director: {
    type: String,
    required: true,
    trim: true
  },

  year: {
    type: Number,
    required: true
  },

  runtime: {
    type: Number
  },

  genre: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  // just the image filename, the actual image is in public/images
  poster: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Movie = mongoose.model('Movie', movieSchema);

// this function loads all 16 movies into the database
// it only runs if the movies collection is empty so we don't get duplicates every restart
async function insertMovies() {
  try {
    // check how many movies are already in the db
    const count = await Movie.countDocuments();
    if (count > 0) return;

    // adding all 16 movies at once
    await Movie.insertMany([
      {
        title:       'Marty Supreme',
        director:    'Josh Safdie',
        year:        2025,
        runtime:     150,
        genre:       'Drama, Thriller',
        description: 'Marty Mauser, a young man with a dream no one respects, goes to hell and back in pursuit of greatness.',
        poster:      'marty_supreme.jpg'
      },
      {
        title:       'Sinners',
        director:    'Ryan Coogler',
        year:        2025,
        runtime:     136,
        genre:       'Action, Horror, Thriller',
        description: 'Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back.',
        poster:      'sinners.jpg'
      },
      {
        title:       'One Battle After Another',
        director:    'Paul Thomas Anderson',
        year:        2025,
        runtime:     162,
        genre:       'Comedy, Action, Crime',
        description: 'When their evil nemesis resurfaces after 16 years, a band of ex-revolutionaries reunite to rescue the daughter of one of their own.',
        poster:      'OBAA.jpg'
      },
      {
        title:       'Train Dreams',
        director:    'Clint Bentley',
        year:        2025,
        runtime:     102,
        genre:       'Drama',
        description: 'A logger leads a life of quiet grace as he experiences love and loss during an era of monumental change in early 20th-century America.',
        poster:      'train_dreams.jpg'
      },
      {
        title:       'Frankenstein',
        director:    'Guillermo del Toro',
        year:        2025,
        runtime:     150,
        genre:       'Sci-Fi, Horror',
        description: 'Dr. Victor Frankenstein brings a creature to life in a monstrous experiment that ultimately leads to the undoing of both the creator and his tragic creation.',
        poster:      'frankenstein.jpg'
      },
      {
        title:       'Mickey 17',
        director:    'Bong Joon-ho',
        year:        2025,
        runtime:     137,
        genre:       'Comedy, Sci-Fi',
        description: 'Unlikely hero Mickey Barnes finds himself working for an employer who demands the ultimate commitment to the job — to die, for a living.',
        poster:      'mickey_17.jpg'
      },
      {
        title:       'If I Had Legs Id Kick You',
        director:    'Mary Bronstein',
        year:        2025,
        runtime:     113,
        genre:       'Drama',
        description: 'With her life crashing down around her, Linda attempts to navigate her child\'s mysterious illness and an increasingly hostile relationship with her therapist.',
        poster:      'if_i_had_legs.jpg'
      },
      {
        title:       'M3GAN 2.0',
        director:    'Gerard Johnstone',
        year:        2025,
        runtime:     120,
        genre:       'Thriller, Sci-Fi',
        description: 'After the underlying tech for M3GAN is stolen, its creator Gemma resurrects M3GAN and gives her a few upgrades — making her faster, stronger, and more lethal.',
        poster:      'm3gan.jpg'
      },
      {
        title:       'Now You See Me: Now You Dont',
        director:    'Ruben Fleischer',
        year:        2025,
        runtime:     113,
        genre:       'Thriller, Crime',
        description: 'The original Four Horsemen reunite with a new generation of illusionists to take on a criminal empire in their most ambitious heist yet.',
        poster:      'now_you.jpg'
      },
      {
        title:       'The Threesome',
        director:    'Chad Hartigan',
        year:        2025,
        runtime:     120,
        genre:       'Romance, Comedy, Drama',
        description: 'A one-night encounter serves as the spark to a relationship, until both women end up pregnant and all three are thrust into a journey toward new realities.',
        poster:      'threesome.jpg'
      },
      {
        title:       'Sentimental Value',
        director:    'Joachim Trier',
        year:        2025,
        runtime:     133,
        genre:       'Drama',
        description: 'Sisters reunite with their estranged father, a once-renowned director, who offers one of them a role in what he hopes will be his comeback film.',
        poster:      'sentimental_value.jpg'
      },
      {
        title:       'The Phoenician Scheme',
        director:    'Wes Anderson',
        year:        2025,
        runtime:     102,
        genre:       'Comedy, Crime',
        description: 'Wealthy businessman Zsa-zsa Korda appoints his only daughter, a nun, as sole heir. They soon become the target of scheming tycoons and determined assassins.',
        poster:      'phoenician.jpg'
      },
      {
        title:       'Bring Her Back',
        director:    'Danny Philippou',
        year:        2025,
        runtime:     104,
        genre:       'Horror',
        description: 'A brother and sister sent to live with a foster mother learn she is hiding a terrifying secret.',
        poster:      'bring_her_back.jpg'
      },
      {
        title:       'Rabbit Trap',
        director:    'Bryn Chainey',
        year:        2025,
        runtime:     88,
        genre:       'Horror, Thriller',
        description: 'When a musician and her husband move to a remote house in Wales, the music they make disturbs local ancient folk magic.',
        poster:      'rabbit_trap.jpg'
      },
      {
        title:       'F1',
        director:    'Joseph Kosinski',
        year:        2025,
        runtime:     156,
        genre:       'Drama, Action',
        description: 'Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling Formula 1 team while chasing one more chance at glory.',
        poster:      'f1.jpg'
      },
      {
        title:       'Thunderbolts',
        director:    'Jake Schreier',
        year:        2025,
        runtime:     127,
        genre:       'Sci-Fi, Action',
        description: 'Seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.',
        poster:      'thunderbolts.jpg'
      }
    ]);

    console.log('Movies loaded into database.');

  } catch (err) {
    console.log('Error loading movies:', err);
  }
}

// call this when the server starts
insertMovies();

// exporting so other files like routes can use the Movie model
module.exports = Movie;
