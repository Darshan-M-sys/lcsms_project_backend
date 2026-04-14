const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📁 Create uploads folder if not exists
const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 🔥 Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

// 🔥 File filter (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  const isValid =
    allowedTypes.test(ext) && allowedTypes.test(mime);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed!"));
  }
};

// 🔥 Upload config
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
});

module.exports = { upload };