const { Op } = require("sequelize");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
    raw: true,
  })
    .then((userData) => {
      const payload = {
        id: req.body.email,
      };
      const token = jwt.sign(payload, "THISISKEY", { expiresIn: "1h" });
      if (userData) {
        userData.subscribed = userData.subscribed ? "true" : "false";
        return res.status(200).json({
          token: token,
          isSubscribed: userData.subscribed,
          role: userData.role,
          userdata: userData,
        });
      } else {
        return User.create({
          name: req.body.name,
          email: req.body.email,
          provider: req.body.provider,
          phone: req.body.phone,
          createdAt: new Date(),
        })
          .then((userData) => {
            userData = userData.dataValues;
            return res.status(200).json({
              token: token,
              isSubscribed: userData.subscribed,
              role: userData.role,
              userdata: userData,
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.update = (req, res) => {
  const userId = req.params.id;
  User.findByPk(userId)
    .then((userData) => {
      if (userData) {
        User.update(
          {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            occupation: req.body.occupation,
          },
          {
            where: {
              id: userId,
            },
          }
        )
          .then((data) => {
            userData = userData.dataValues;
            return res.status(200).json(userData);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    })
    .catch((err) => console.log(err));
};

module.exports.makeMod = (req, res) => {
  const email = req.body.email;
  User.findOne({
    where: {
      email: email,
    },
    raw: true,
  })
    .then((userData) => {
      if (userData) {
        try {
          User.update(
            {
              role: "MODERATOR",
            },
            {
              where: {
                email: email,
              },
            }
          )
            .then((data) => {
              userData = userData.dataValues;
              return res.status(200).json(userData);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    })
    .catch((err) => console.log(err));
};
module.exports.makeTeam = (req, res) => {
  const email = req.body.email;
  User.findOne({
    where: {
      email: email,
    },
    raw: true,
  })
    .then((userData) => {
      if (userData) {
        try {
          User.update(
            {
              role: "TEAM",
            },
            {
              where: {
                email: email,
              },
            }
          )
            .then((data) => {
              userData = userData.dataValues;
              return res.status(200).json(userData);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    })
    .catch((err) => console.log(err));
};
module.exports.makeUser = (req, res) => {
  const email = req.body.email;
  User.findOne({
    where: {
      email: email,
    },
    raw: true,
  })
    .then((userData) => {
      if (userData) {
        try {
          User.update(
            {
              role: "USER",
            },
            {
              where: {
                email: email,
              },
            }
          )
            .then((data) => {
              userData = userData.dataValues;
              return res.status(200).json(userData);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    })
    .catch((err) => console.log(err));
};

module.exports.allUsers = (req, res) => {
  User.findAll({
    raw: true,
  })
    .then((users) => {
      return res.status(200).json(users);
    })
    .catch((err) => console.log(err));
};
