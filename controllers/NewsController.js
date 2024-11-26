const News = require("../models/Content");
const cloudinary = require("../utils/Cloudinary");



//Create a news 
const createNews = async (req, res) => {
    try {
      const { title, content, category } = req.body;
  
      if (!title || !content || !category ) {
        return res.status(400).json({ message: "Please fill in all details" });
      }
  
  
      // Upload image/video to Cloudinary
      const newsImage = await cloudinary.uploader.upload(req.file.path);
      const newsVideo = await cloudinary.uploader.upload(req.file.path);
      const newsData = { ...req.body, images: newsImage.url, videos: newsVideo.url }; // Store Cloudinary image URL
  
      const news = await News.create(newsData);
      res.status(201).json(news);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  // Get all news
const getNews = async (req, res) => {
    try {
      const news = await News.find({});
      res.status(200).json({
        Message: "News found",
        Iwe: news,
        NumberOfBooks: news.length,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Delete a book
const deleteNews = async (req, res) => {
    try {
      const { id } = req.params;
  
      const news = await News.findByIdAndDelete(id);
  
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
  
      res.status(200).json({ message: "News successfully deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  


  module.exports = {
    createNews,
    getNews,
    deleteNews,
  };