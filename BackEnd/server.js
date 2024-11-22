// Import the necessary modules
const express = require('express'); // Express framework for building the server
const app = express(); // Create an Express app instance
const port = 4000; // Define the port on which the server will listen

const cors = require('cors'); 
app.use(cors()); 

// Custom middleware to handle CORS headers explicitly
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); 
});

// Import and configure the body-parser middleware to parse incoming request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data (e.g., form submissions)
app.use(bodyParser.json()); // Parse JSON data sent in requests

// Set up MongoDB connection using Mongoose ORM
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://123:123@cluster0.wky8o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// The MongoDB URL to connect to the database, replace with actual credentials in a real application

// Define the schema for the "Movie" collection
const movieSchema = new mongoose.Schema({
  title: String, 
  year: String, 
  poster: String  
});

// Create a model for the "Movie" collection based on the schema
const Movie = mongoose.model('Movie', movieSchema);

// Route to handle POST requests to create a new movie
app.post('/api/movies', async (req, res) => {
  const { title, year, poster } = req.body; // Destructure the title, year, and poster from the request body
  
  // Create a new Movie instance using the data from the request body
  const newMovie = new Movie({ title, year, poster });
  
  // Save the new movie to the database
  await newMovie.save();
  
  // Respond with a success message and the created movie data
  res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});

// Route to handle GET requests to retrieve all movies from the database
app.get('/api/movies', async (req, res) => {
  const movies = await Movie.find({}); 
  res.json(movies);
});

// Route to return a predefined list of movies (simulating a server response)
app.get('/api/movies/server', (req, res) => {
  const movies = [ 
    {
      "Title": "Avengers: Infinity War (server)",
      "Year": "2018",
      "imdbID": "tt4154756",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    },
    {
      "Title": "Captain America: Civil War (server)",
      "Year": "2016",
      "imdbID": "tt3498820",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    },
    {
      "Title": "World War Z (server)",
      "Year": "2013",
      "imdbID": "tt0816711",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    }
  ];
  // Send the static movies list as the response
  res.status(200).json({ movies });
});

// Route to handle GET requests to retrieve a specific movie by its ID
app.get('/api/movies/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id); // Find the movie by its unique ID from the URL parameter
  res.send(movie); // Return the movie data as the response
});

// Start the server and listen for incoming requests on the defined port (4000)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log a message indicating the server is running
});
