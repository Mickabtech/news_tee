const News = require("../models/Content");
const cloudinary = require("../utils/cloudinary");

const createNews = async (req, res) => {
  try {
    console.log("Files received:", req.files); // Log files to debug
    console.log("Body received:", req.body);   // Log form data

    const { title, content, category } = req.body;

    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    let uploadedImage = null;
    let uploadedVideo = null;

    // Handle optional image upload
    if (req.files && req.files.images) {
      try {
        const imageResult = await cloudinary.uploader.upload(req.files.images[0].path);
        uploadedImage = imageResult.secure_url;
      } catch (err) {
        console.error("Image upload failed:", err.message);
        return res.status(500).json({ message: "Image upload to Cloudinary failed." });
      }
    }

    // Handle optional video upload
    if (req.files && req.files.videos) {
      try {
        const videoResult = await cloudinary.uploader.upload(req.files.videos[0].path, {
          resource_type: "video",
        });
        uploadedVideo = videoResult.secure_url;
      } catch (err) {
        console.error("Video upload failed:", err.message);
        return res.status(500).json({ message: "Video upload to Cloudinary failed." });
      }
    }

    // Create news data
    const newsData = {
      title,
      content,
      category,
      images: uploadedImage, // Store uploaded image URL (or null if no image)
      videos: uploadedVideo, // Store uploaded video URL (or null if no video)
    };

    // Save news to the database
    const news = await News.create(newsData);

    res.status(201).json({
      message: "News created successfully.",
      news,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "An error occurred while creating the news." });
  }
};

const getNews = async (req, res) => {
  try {
    const news = await News.find({});
    res.status(200).json({
      message: "News found.",
      iwe: news, // Array of news
      numberOfNews: news.length, // Total count
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ message: "An error occurred while retrieving news." });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return res.status(404).json({ message: "News not found." });
    }

    res.status(200).json({ message: "News successfully deleted." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ message: "An error occurred while deleting the news." });
  }
};

module.exports = {
  createNews,
  getNews,
  deleteNews,
};
