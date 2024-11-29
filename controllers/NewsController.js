const News = require("../models/Content");
const cloudinary = require("../utils/Cloudinary");



const createNews = async (req, res) => {
  try {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    let uploadedImage = null;
    let uploadedVideo = null;

    // Handle image upload
    if (req.files && req.files.image) {
      try {
        const imageResult = await cloudinary.uploader.upload(req.files.image[0].path);
        uploadedImage = imageResult.secure_url;
      } catch (err) {
        console.error("Image upload failed:", err.message);
        return res.status(500).json({ message: "Image upload to Cloudinary failed" });
      }
    }

    // Handle video upload
    if (req.files && req.files.video) {
      try {
        const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, {
          resource_type: "video",
        });
        uploadedVideo = videoResult.secure_url;
      } catch (err) {
        console.error("Video upload failed:", err.message);
        return res.status(500).json({ message: "Video upload to Cloudinary failed" });
      }
    }

    // Create news
    const newsData = {
      title,
      content,
      category,
      images: uploadedImage,
      videos: uploadedVideo,
    };

    const news = await News.create(newsData);
    res.status(201).json(news);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};


  // Get all news
const getNews = async (req, res) => {
    try {
      const news = await News.find({});
      res.status(200).json({
        Message: "News found",
        Iwe: news,
        NumberOfNews: news.length,
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