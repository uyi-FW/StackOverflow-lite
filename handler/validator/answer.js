const { body } = require("express-validator");

exports.ADD_ANSWER = [
  body("description")
    .isString()
    .trim()
    .notEmpty()
];


