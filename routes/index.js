const express = require("express");
const fs = require("fs");
const router = express.Router();

const path = require("path");

const routesDir = path.join(__dirname);

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(routesDir).forEach((file) => {
  const routeName = removeExtension(file);
  if (routeName !== "index") {
    console.log(`Loading route ${routeName}`);
    const routePath = path.join(routesDir, file);
    const route = require(routePath);
    router.use(`/${routeName}`, route);
  }
});

module.exports = router;
