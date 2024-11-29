const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // Updated naming for consistency
const path = require('path');
const bodyParser = require('body-parser');
const NewsRoute = require('./routes/NewsRoute');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse form-data for file uploads

// Static file serving for uploads
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// API Routes
app.use('/api/news', NewsRoute);

// Database Connection
const mongodbURL = process.env.MONGOURI;

if (!mongodbURL) {
  console.error('MONGOURI is not defined in the .env file.');
  process.exit(1); // Exit the app if no DB URL is provided
}

mongoose
  .connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the app if DB connection fails
  });

// Start Server
const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
