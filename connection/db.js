// const { Client } = require("pg");
// const config = require("./config");

// const connectDB = async () => {
//   try {
//     const client = new Client(config);
//     await client.connect();

//     console.log("Database Connected!");

//     return client;
//   } catch (e) {
//     console.log("Error connecting to the database", e);
//     throw e;
//   }
// };

// module.exports = connectDB;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("shopping_app", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
});

const dbConnectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

module.exports = { sequelize, dbConnectMysql };
