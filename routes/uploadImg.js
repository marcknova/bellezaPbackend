const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/uploadFiles");
const createProductWithImage = require("./createProducts");

router.post(
  "/",
  uploadImage([
    { name: "img", maxCount: 1 },
    { name: "imghover", maxCount: 1 },
  ]),
  async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No image upload" });
    }

    try {
      const image1Filename = req.files["img"][0].filename;
      const image2Filename = req.files["imghover"][0].filename;

      const img = {
        image1: image1Filename,
        image2: image2Filename,
      };
      await createProductWithImage(img, req.body);

      res.json({ message: "Images uploaded successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error creating product" });
    }
  }
);

module.exports = router;
