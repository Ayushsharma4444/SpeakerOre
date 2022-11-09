require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.SQLITE_DATABASE  ,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  logging: false,
});

module.exports = sequelize;
