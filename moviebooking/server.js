const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const dbConfig = require('./config/db.config.js');

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

// //Routes
// app.get('/movies', (req, res) => {
//   res.send('All Movies Data in JSON format from Mongo DB');
// });

// app.get('/genres', (req, res) => {
//   res.send('All Genres Data in JSON format from Mongo DB');
// });

// app.get('/artists', (req, res) => {
//   res.send('All Artists Data in JSON format from Mongo DB');
// });

// // Default route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Upgrad Movie booking application development." });
// });

// api and non-api hangler
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});
app.get("/api/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

// Routes
app.use("/artists", require("./routes/artist.routes"));
app.use("/api/artists", require("./routes/artist.routes"));

app.use("/genres", require("./routes/genre.routes"));
app.use("/api/genres", require("./routes/genre.routes"));

app.use("/movies", require("./routes/movie.routes"));
app.use("/api/movies", require("./routes/movie.routes"));

app.use("/auth/",require("./routes/user.routes"));
app.use("/api/auth/", require("./routes/user.routes"));

// Set up mongoose and database connection
const db = require("./config/db.config");
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database!"); 
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

// // MongoDB connection URI
// const mongoURL = 'mongodb://localhost:27017/moviesdb';

// // Connect to MongoDB test
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// // Check MongoDB connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });


// // Start the server
// app.listen(9000, () => {
//     console.log(`Server is running on http://localhost:9000`);
// });

// Start the server
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});