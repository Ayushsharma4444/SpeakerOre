const { Op } = require("sequelize");
const Event = require("../models/event");

module.exports.addEvent = (req, res) => {
  Event.create({
    userId: req.body.userId,
    eventName: req.body.eventName,
    website: req.body.website,
    contactName: req.body.contactName,
    contactEmail: req.body.contactMail,
    contactPhone: req.body.contactPhone,
    description: req.body.description,
    detailedDescription: req.body.detailedDescription,
    isApproved: req.body.isApproved,
    startTime: req.body.start_time,
    endTime: req.body.end_time,
    mode: req.body.mode,
    location: req.body.location,
    topic: req.body.topic,
    engagementTerm: req.body.engagementTerm,
    eventType: req.body.eventType,
    audienceType: req.body.audienceType,
    audienceSize: req.body.audienceSize,
    tags: req.body.tags,
    categories: JSON.stringify(req.body.categories),
    isExclusive: req.body.isExclusive,
  })
    .then((eventData) => {
      return res.status(200).json(eventData.dataValues);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.displayAllEvents = (req, res) => {
  Event.findAll({
    raw: true,
  })
    .then((eventData) => {
      console.log(eventData);
      return res.status(200).json(eventData);
    })
    .catch((err) => console.log(err));
};

module.exports.approve = (req, res) => {
  Event.update(
    {
      isApproved: true,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((event) => {
      return res.status(200).json(event);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.reject = (req, res) => {
  Event.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((event) => {
      return res.status(200).json(event);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getEventById = (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((eventData) => {
      return res.status(200).json(eventData);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.removeEvent = (req, res) => {
  Event.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((event) => {
      return res.status(200).json({
        success: true,
        message: "Event removed successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
