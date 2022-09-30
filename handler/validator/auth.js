const { body } = require("express-validator");

const db = require("../../models");
const User = db.user;

exports.REGISTER = [
  body("firstName")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 50 })
    .withMessage("first name must be between 2-50 characters")
    .toLowerCase()
    .isAlpha()
    .withMessage("first name can only contain letters"),

  body("lastName")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 50 })
    .withMessage("last name must be between 2-50 characters")
    .toLowerCase()
    .isAlpha()
    .withMessage("last name can only contain letters"),

  body("email")
    .trim()
    .notEmpty()
    .toLowerCase()
    .normalizeEmail()
    .isEmail()
    .withMessage("email must be a valid email address")
    .custom((value, { req }) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("email already in use");
        }
      });
    }),

  body("password")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 50 })
    .withMessage("password must have a minimum of 8 characters")
    .isStrongPassword()
    .withMessage(
      "password must be a combination of uppercase letters, lowercase letters, numbers and special characters"
    ),
];

exports.LOGIN = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .toLowerCase()
    .normalizeEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((result) => {
        if (!result) {
          return Promise.reject("email does not exist");
        }
        req.user = result;
      });
    }),

  body("password").notEmpty().trim(),
];
