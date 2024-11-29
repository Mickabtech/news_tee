const express = require("express");
const router = express.Router();
const { createNews, getNews, deleteNews } = require("../controllers/NewsController");
const upload = require("../config/Upload");

// Create news route
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 1 },
    { name: "videos", maxCount: 1 },
  ]),
  createNews
);

// Get all news route
router.get("/", getNews);

// Delete news route
router.delete("/:id", deleteNews);

module.exports = router;
