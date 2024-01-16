const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/users");
const generateRandomKey = require("../utils/generatorKey");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || generateRandomKey();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({
    where: { username },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: user.username, userId: user.id, role: user.role },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
});

module.exports = router;
