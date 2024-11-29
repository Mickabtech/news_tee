const express = require("express");
const router = express.Router();
const { createNews, getNews, deleteNews } = require("../controllers/NewsController");
const upload = require("../config/Upload"); // Middleware for file uploads

// Route to create news (supports optional image and video uploads)
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 1 }, // Handle a single image file
    { name: "videos", maxCount: 1 }, // Handle a single video file
  ]),
  createNews
);

// Route to get all news
router.get("/", getNews);

// Route to delete a specific news item by ID
router.delete("/:id", deleteNews);

module.exports = router;
