const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const { dbConnectMysql } = require("./connection/db");
const session = require("express-session");
const passport = require("./utils/passport-config");

const PORT = 3001;

app.use(passport.initialize());

// Configuración de Express y Passport
app.use(
  session({
    secret: process.env.SECRET_KEY_LOGIN,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

app.use("/uploads", express.static("./uploads"));

app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});

dbConnectMysql();
