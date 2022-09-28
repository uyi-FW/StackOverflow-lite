const { body } = require("express-validator");
const Question = require("../../models/question");

// const db = require("../../models");
// const User = db.user;

exports.ADD_QUESTION = [
  body("description")
    .isString()
    .notEmpty()
    .trim()
];