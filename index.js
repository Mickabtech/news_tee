const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const NewsRoute = require("./routes/NewsRoute");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files
app.use("/upload", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/news", NewsRoute);

// Database connection
const mongodbURL = process.env.MONGOURI;
mongoose
  .connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully."))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

// Start server
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server running on port ${port}`));
