const express = require("express");
const router = express.Router();
const {createNews, getNews, deleteNews} = require("../controllers/NewsController")

const upload = require("../config/Upload")

router.post(
    "/",
    upload.fields([
      { name: "images", maxCount: 1 }, // Handle a single image
      { name: "videos", maxCount: 1 }, // Handle a single video
    ]),
    createNews
  );
router.get("/", getNews);
router.delete("/:id", deleteNews);

module.exports = router;