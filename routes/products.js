const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({ order: [["createdAt", "DESC"]] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:type", async (req, res) => {
  const { type } = req.params;

  try {
    console.log("Fetching products with type:", type);

    // Fetch products with the specified type (case-insensitive)
    const products = await Product.findAll({
      where: {
        typeproduct: {
          [Op.iLike]: type,
        },
      },
    });
    console.log("Fetched products:", products);

    // Send the products as a response
    res.json(products);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update a product
router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, price } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      product.name = name;
      product.price = price;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (product) {
      await product.destroy();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
