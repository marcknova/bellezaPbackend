const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../uploads");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Use the original file name as the destination file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadImage = (field) => {
  return upload.fields(field);
};

module.exports = uploadImage;
