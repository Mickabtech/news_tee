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