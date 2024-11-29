const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure `uploads` directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files temporarily to `uploads` directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG images, and MP4 videos are allowed."));
  }
};

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
  fileFilter,
});

module.exports = upload;
