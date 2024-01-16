const jwt = require("jsonwebtoken");
const generateRandomKey = require("../utils/generatorKey");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET || generateRandomKey();

const decodeTokenMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = decodeTokenMiddleware;
