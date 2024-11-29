const News = require("../models/Content");
const cloudinary = require("../utils/Cloudinary");

// Create news
const createNews = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    let uploadedImage = null;
    let uploadedVideo = null;

    // Handle image upload
    if (req.files?.images) {
      try {
        const imageResult = await cloudinary.uploader.upload(req.files.images[0].path);
        uploadedImage = imageResult.secure_url;
      } catch (err) {
        return res.status(500).json({ message: "Image upload failed.", error: err.message });
      }
    }

    // Handle video upload
    if (req.files?.videos) {
      try {
        const videoResult = await cloudinary.uploader.upload(req.files.videos[0].path, {
          resource_type: "video",
        });
        uploadedVideo = videoResult.secure_url;
      } catch (err) {
        return res.status(500).json({ message: "Video upload failed.", error: err.message });
      }
    }

    // Save news
    const news = await News.create({
      title,
      content,
      category,
      images: uploadedImage,
      videos: uploadedVideo,
    });

    res.status(201).json({ message: "News created successfully.", news });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating news.", error: error.message });
  }
};

// Get all news
const getNews = async (req, res) => {
  try {
    const news = await News.find({});
    res.status(200).json({ message: "News retrieved successfully.", iwe: news, numberOfNews: news.length });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve news.", error: error.message });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({ message: "News not found." });
    }

    res.status(200).json({ message: "News deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete news.", error: error.message });
  }
};

module.exports = { createNews, getNews, deleteNews };
