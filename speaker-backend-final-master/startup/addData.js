const User = require("../models/user");
const subscriptionPlan = require("../models/subscriptionPlan");

// add a new user to the database

// const User = sequelize.define("user", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     role: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//       defaultValue: "user",
//     },
//     disable: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//       defaultValue: false,
//     },
//     phone: {
//       type: DataTypes.BIGINT,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     provider: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     subscribed: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//       defaultValue: false,
//     },
//     createdAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     age: {
//       type: DataTypes.INTEGER,
//     },
//     occupation: {
//       type: DataTypes.STRING,
//     },
//   });

const addUser = () => {
  // if the user is not in the database, add the user to the database
  User.findOne({
    where: {
      email: "speakerore@gmail.com",
    },
  })
    .then((user) => {
      if (!user) {
        User.create({
          name: "Speaker Ore",
          email: "speakerore@gmail.com",
          role: "MODERATOR",
          disable: false,
          phone: 1234567890,
          provider: "email",
          subscribed: true,
          createdAt: new Date(),
          age: 30,
          occupation: "Web Developer",
        })
          .then(() => {
            console.log("User added to the database");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("User already in the database");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  User.findOne({
    where: {
      email: "abhixshakya@gmail.com",
    },
  })
    .then((user) => {
      if (!user) {
        User.create({
          name: "Abhishek Shakya",
          email: "abhixshakya@gmail.com",
          role: "MODERATOR",
          disable: false,
          phone: 1234567890,
          provider: "email",
          subscribed: true,
          createdAt: new Date(),
          age: 30,
          occupation: "Web Developer",
        })
          .then(() => {
            console.log("User added to the database");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("User already in the database");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// add a new subscription plan to the database

// const SubscriptionPlan = sequelize.define("subscriptionPlan", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     duration: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     price: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     disable: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//       defaultValue: false,
//     },
//     features: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//   });

const addSubscriptionPlan = () => {
  subscriptionPlan
    .findOne({
      where: {
        name: "Golden",
      },
    })
    .then((subscriptionplan) => {
      if (!subscriptionplan) {
        subscriptionPlan
          .create({
            id: 1,
            name: "Golden",
            duration: 1,
            price: 11999,
            disable: false,
            features: "1GB of storage, 1GB of bandwidth",
          })
          .then(() => {
            console.log("Subscription plan added to the database");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Subscription plan already in the database");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { addUser, addSubscriptionPlan };
