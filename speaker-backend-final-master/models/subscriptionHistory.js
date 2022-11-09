const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");
const Payment = require("./payment");
const SubscriptionPlan = require("./subscriptionPlan");

const SubscriptionHistory = sequelize.define("subscriptionHistory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.hasOne(SubscriptionHistory, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});

SubscriptionHistory.belongsTo(User);

Payment.hasOne(SubscriptionHistory, {
  foreignKey: {
    name: "paymentId",
    allowNull: false,
  },
});

SubscriptionHistory.belongsTo(Payment);

SubscriptionPlan.hasOne(SubscriptionHistory, {
  foreignKey: {
    name: "subscriptionPlanId",
    allowNull: false,
  },
});

SubscriptionHistory.belongsTo(SubscriptionPlan);

module.exports = SubscriptionHistory;
