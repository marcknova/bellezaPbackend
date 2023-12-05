const { Sequelize } = require("sequelize");
require("dotenv").config();

const PGUSER = process.env.PGUSER;
const HOST = process.env.HOST || "localhost";
const PASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;

const sequelize = new Sequelize({
  dialect: "postgres",
  database: PGDATABASE,
  username: PGUSER,
  password: PASSWORD,
  host: HOST,
});

const dbConnectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    // await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

module.exports = { sequelize, dbConnectMysql };
