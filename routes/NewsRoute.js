const express = require("express");
const router = express.Router();
const {createNews, getNews, deleteNews} = require("../controllers/NewsController")

const upload = require("../config/Upload")

router.post("/", upload.single("file"), createNews);
router.get("/", getNews);
router.delete("/:id", deleteNews);

module.exports = router;