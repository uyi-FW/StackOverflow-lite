const db = require('../models')
const Answer = db.answer;

const { validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../handler/response");

class Answers {
  static async addAnswer(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 422, "validation error", errors.mapped());
    }

    try {
      let payload = {
        description: req.body.description,
        userId: req.user.id,
        questionId: req.params.id
      };

      // save to db
      const newAnswer = await Answer.create(payload);
      return successResponse(res, 201, "successful", newAnswer);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

module.exports = Answers;
