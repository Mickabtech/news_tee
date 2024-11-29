const mongoose = require("mongoose");

// Schema definition
const newsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: String }, // URL of uploaded image (optional)
    videos: { type: String }, // URL of uploaded video (optional)
  },
  { timestamps: true }
);

// Model creation
const News = mongoose.model("News", newsSchema);

module.exports = News;
