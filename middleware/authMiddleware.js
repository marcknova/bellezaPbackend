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

module.exports = { checkUserExistence };
