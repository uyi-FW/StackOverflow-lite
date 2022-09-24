const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");

const db = require("../models")
const User = db.user;

const { validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../handler/response");

class Users {
  static async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 422, "validation error", errors.mapped());
    }
    // await User.findOne({ where: { email: req.body.email } }).then((user) => {
    //   if (user) {
    //     return Promise.reject("email already in use");
    //   }
    // });

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      let payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      };

      const newUser = await User.create(payload);
      console.log(newUser);

      return successResponse(res, 201, "sign up completed", newUser);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

module.exports = Users;
