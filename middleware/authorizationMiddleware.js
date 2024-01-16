const authorizationMiddleware = (requireRole) => {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;

    if (userRole !== requireRole) {
      console.log("Forbidden: Insufficient permissions");
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }

    next();
  };
};

module.exports = authorizationMiddleware;
