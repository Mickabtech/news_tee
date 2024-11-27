const News = require("../models/Content");
const cloudinary = require("../utils/Cloudinary");



const createNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({ message: "Please fill in all required details" });
    }

    let uploadedImage = null;
    let uploadedVideo = null;

    // Check if a file was uploaded and handle image/video accordingly
    if (req.file) {
      const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";
      const uploadResult = await cloudinary.uploader.upload(req.file.path);

      if (fileType === "image") {
        uploadedImage = uploadResult.secure_url; // Store the uploaded image URL
      } else if (fileType === "video") {
        uploadedVideo = uploadResult.secure_url; // Store the uploaded video URL
      }
    }

    // Prepare the data to be saved
    const newsData = {
      title,
      content,
      category,
      images: uploadedImage, // Optional image URL
      videos: uploadedVideo, // Optional video URL
    };

    const news = await News.create(newsData); // Save to database
    res.status(201).json(news); // Return the created news
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