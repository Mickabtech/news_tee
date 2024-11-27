const express = require("express");
const router = express.Router();
const {createNews, getNews, deleteNews} = require("../controllers/NewsController")

const upload = require("../config/Upload")

router.post("/news", upload.single("file"), createNews);
router.get("/news", getNews);
router.delete("/news/:id", deleteNews);

module.exports = router;