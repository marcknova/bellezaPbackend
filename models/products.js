const { DataTypes } = require("sequelize");
const { sequelize } = require("../connection/db");

const Product = sequelize.define(
  "products",
  {
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
      type: DataTypes.FLOAT,
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
      allowNull: false,
      type: DataTypes.STRING,
    },

    imghover: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: "updatedAt", // make sure to match the field name in your table
  }
);

module.exports = Product;
