const db = require("../models");
const Question = db.question;

const { validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../handler/response");
const { kMaxLength } = require("buffer");

class Questions {
  static async addQuestion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 422, "validation error", errors.mapped());
    }

    try {
      //attach the ID of the signed-in user so we can tied this question to the user
      let payload = {
        description: req.body.description,
        userId: req.user.id,
      };

      //save to Db
      const newQuestion = await Question.create(payload);

      return successResponse(res, 201, "successful", newQuestion);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

  module.exports = Questions