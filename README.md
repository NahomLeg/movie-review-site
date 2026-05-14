# movie-review-site / CineReview
A movie review web application built with Node.js, Express, MongoDB Atlas, and Pug templates. Users can register, log in, browse movies, search by genre or title, and create, edit, or delete reviews. Movie data is automatically preloaded, with user data stored in MongoDB Atlas.

## Features
- User authentication with bcrypt password hashing
- Browse movies with posters, genres, and details
- Search movies by title
- Filter movies by genre
- Create, edit, and delete reviews
- User dashboard displaying profile information and reviews
- Cloud-hosted MongoDB Atlas database integration

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Pug Templates
- JavaScript
- HTML/CSS
- bcrypt

## Installation and Setup

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account

### Steps
1. Clone the repository
2. Install dependencies:
   npm install

3. Create a `.env` file and add:
   MONGO_URI=your_connection_string
   PORT=3000

4. Start the server:
   node server.js

5. Open:
   http://localhost:3000

## Project Structure
- `models/` — Database schemas
- `routes/` — Application routes
- `views/` — Pug templates
- `public/` — Static assets and frontend files

## Contributors
- Nahoum Legesse
- Boris Gueye
- Ruoyu Gong
- Michel Lienou Zeitcheu
