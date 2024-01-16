const crypto = require("crypto");

const generateRandomKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = generateRandomKey;
