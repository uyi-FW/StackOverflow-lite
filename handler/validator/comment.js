const { body } = require("express-validator");

exports.ADD_COMMENT = [
  body("description")
    .isString()
    .trim()
    .notEmpty()
];
