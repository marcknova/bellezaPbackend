const checkUserRole = (req, res, next) => {
  const role = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid user role" });
  }

  next();
};

module.exports = checkUserRole;
