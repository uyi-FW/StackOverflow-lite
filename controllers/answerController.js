const db = require('../models')
const Answer = db.answer;
const Question = db.question;

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

      const question = await Question.findOne({ where: { id: req.params.id } })

      if (!question) {
        return errorResponse(res, 404, "question not found", null);
      }

      // save to db
      const newAnswer = await Answer.create(payload);
      return successResponse(res, 201, "successful", newAnswer);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async getAllAnswers(req, res)
  {
    try {
      const answers = await Answer.findAll({
        where: { questionId: Number(req.params.id)},
        include: Question
      })
      if (Object.keys(answers).length === 0) {
        return errorResponse(res, 404, "question not found", null);
      }
      return successResponse(res, 200, "successful", answers);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
 }}

module.exports = Answers;
