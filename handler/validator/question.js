const { body } = require("express-validator");

exports.ADD_QUESTION = [
  body("description")
    .isString()
    .notEmpty()
    .trim()
];