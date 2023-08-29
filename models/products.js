const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/db");

const Product = sequelize.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name is required",
      },
      notEmpty: {
        msg: "Name cannot be empty",
      },
    },
  },

  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "price is required",
      },
      notEmpty: {
        msg: "price cannot be empty",
      },
    },
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "description is required",
      },
      notEmpty: {
        msg: "description cannot be empty",
      },
    },
  },

  typeproduct: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "type of product is required",
      },
      isIn: {
        args: [["libs", "eyes", "face"]],
        msg: "Invalid type of product",
      },
      notEmpty: {
        msg: "type of product cannot be empty",
      },
    },
  },

  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  imghover: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
