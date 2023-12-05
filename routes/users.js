const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { checkUserExistence } = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const users = await Users.findAll();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", checkUserExistence, async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const newUser = await Users.create({ username, password, email });
    res.json(newUser);
    console.log("User created");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Sever Error" });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, password, email } = req.body;

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ username, password, email });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
