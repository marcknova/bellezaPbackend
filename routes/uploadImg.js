const express = require("express");
const router = express.Router();
const multer = require("multer");
const createProductWithImage = require("./createProducts");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No image upload" });
    }

    try {
      const image1Filename = req.files["image1"][0].filename;
      const image2Filename = req.files["image2"][0].filename;

      const img = {
        image1: image1Filename,
        image2: image2Filename,
      };

      const images = Object.values(req.files).map((fileArray) => {
        return {
          filename: fileArray[0].filename,
          originalname: fileArray[0].originalname,
        };
      });

      await createProductWithImage(img, req.body);

      res.json({ message: "Image uploaded successfully", images });
    } catch (error) {
      // Delete the uploaded images if an error occurs
      Object.values(req.files).forEach((fileArray) => {
        const filename = fileArray[0].filename;
        fs.unlinkSync(`uploads/${filename}`);
      });

      res.status(500).json({ error: "Error creating product" });
    }
  }
);

module.exports = router;
