const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Event = require("./event");
const User = require("./user");

const BookMarks = sequelize.define("bookmarks", {});

BookMarks.removeAttribute("id");

Event.belongsToMany(User, {
  through: BookMarks,
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

User.belongsToMany(Event, {
  through: BookMarks,
  foreignKey: {
    name: "eventId",
    allowNull: false,
  },
});

module.exports = BookMarks;
