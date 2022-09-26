const db = require("../models");
const Question = db.question;
const User = db.user;

const { validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../handler/response");

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

  static async getAll(req, res) {
    try {
      const questions = await Question.findAll({
        // to load eager relations
        include: User,
      });

      return successResponse(res, 200, "successful", questions);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async getMine(req, res) {
    // get id from the user that is fetched from the token
    let id = req.user.id;

    try {
      //fetch question(s) from db where the userId == the signed-in user's id
      const questions = await Question.findAll({
        where: { userId: id },
      });

      return successResponse(res, 200, "successful", questions);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async getOne(req, res) {
    let id = req.params.id;

    try {
      const questions = await Question.findOne({
        where: { id: id },
        // to load eager relations
        include: User,
      });

      if (!questions) {
        return errorResponse(res, 404, "question not found", null);
      }

      return successResponse(res, 200, "successful", questions);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async deleteQuestion(req, res) {
    let userId = req.user.id;
    let paramsId = req.params.id

    try {
      const question = await Question.findOne({
        where: { id: paramsId },
      });

      if (!question) {
        return errorResponse(
          res,
          404,
          "question not found",
          null
        );
      }

      if (userId != question.userId) {
        return errorResponse(res, 401, "you can't delete another user's question ", null);
      }

      await Question.destroy({
        where: { id: paramsId },
      });

      return successResponse(res, 200, "question is deleted successfully", question);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

module.exports = Questions;
