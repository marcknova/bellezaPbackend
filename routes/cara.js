const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// router.get("/", async (req, res) => {
//   try {
//     const client = await connectDB();

//     const result = await client.query(
//       "SELECT * FROM products WHERE typeproduct = 'Cara'"
//     );
//     const products = result.rows;

//     res.json(products);

//     await client.end();
//   } catch (e) {
//     console.error("Error retrieving products", e);
//     res.status(500).json({ error: "Faile to retrieve products" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
