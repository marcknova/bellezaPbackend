const jwt = require("jsonwebtoken");
const Users = require("../models/users");

const { Op } = require("sequelize");

const checkUserExistence = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(409).json({ error: "Username Already Exists" });
      } else {
        return res.status(409).json({ error: "Email Already Exists" });
      }
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const authenticationToken = async (req, res, next) => {
  const token = req.headers("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }
  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = { checkUserExistence, authenticationToken };
