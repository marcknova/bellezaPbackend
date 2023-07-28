require("dotenv").config;
const express = require("express");
const cors = require("cors");
const { dbConnectMysql } = require("./connection/db");
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

app.use("/uploads", express.static("./uploads"));

app.use("/api", require("./routes"));

app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});

dbConnectMysql();
