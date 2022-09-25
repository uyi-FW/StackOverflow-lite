const db = require("../models");
const Question = db.question;
// const User = db.user;

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
        /* trying to load eager relations */
        // include: User,
        // include: [
        //   {
        //     model: Users,
        //     as: "user",
        //   },
        // ],
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

      console.log(questions);

      return successResponse(res, 200, "successful", questions);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async getOne(req, res) {
    let id = req.params.id;
    console.log(typeof id);

    try {
      const questions = await Question.findOne({
        where: { id: id },
      });

      return successResponse(res, 200, "successful", questions);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

module.exports = Questions;
