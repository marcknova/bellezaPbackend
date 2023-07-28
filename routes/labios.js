const express = require("express");
const connectDB = require("../connection/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const client = await connectDB();

    const result = await client.query(
      "SELECT * FROM products WHERE typeproduct = 'Labios'"
    );
    const products = result.rows;

    res.json(products);

    await client.end();
  } catch (e) {
    console.error("Error retrievin products", e);
    res.status(500).json({ error: "Faile to retrieve products" });
  }
});

module.exports = router;
