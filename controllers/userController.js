const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const User = require("../models/user");

const db = require("../models");
const User = db.user;

const { validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../handler/response");

class Users {
  static async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 422, "validation error", errors.mapped());
    }

    try {
      // hashing the password
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      let payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      };

      // save to db
      const newUser = await User.create(payload);
      console.log(newUser);

      return successResponse(res, 201, "sign up completed", newUser);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 422, "validation error", errors.mapped());
    }
    try {
      // getting the password from req.body
      const { password } = req.body;

      // req.user is passed from the validator
      const user = req.user;
      // check validity of password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return errorResponse(res, 409, "invalid login details", null);
      } else {
        // create a token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        successResponse(res, 200, "login successful", {
          token,
          fullName: `${user.firstName} ${user.lastName}`,
        });
      }
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

module.exports = Users;
