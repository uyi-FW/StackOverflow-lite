const db = require("../models");
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
        questionId: req.params.id,
      };

      const question = await Question.findOne({ where: { id: req.params.id } });

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

  static async getAllAnswers(req, res) {
    try {
      // fetch question
      let question = await Question.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!question) {
        return errorResponse(res, 404, "question not found", null);
      }

      question = question.toJSON();

      //find answers
      const answers = await Answer.findAll({
        where: { questionId: Number(req.params.id) },
      });

      // if the question has no answers
      if (Object.keys(answers).length === 0) {
        return successResponse(res, 201, "no content", {
          question,
          answers: "this question has no answers",
        });
      }
      return successResponse(res, 200, "successful", { question, answers });
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async getOneAnswer(req, res) {
    try {
      let answer = await Answer.findOne({
        where: { id: Number(req.params.id) },
        include: Question,
      });
      if (!answer) {
        return errorResponse(res, 404, "answer not found", null);
      }
      answer = answer.toJSON();

      return successResponse(res, 200, "successful", {
        answer,
      });
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async acceptAnswer(req, res) {
    try {
      const id = Number(req.params.id);
      

      let answer = await Answer.findOne({
        where: { id: id },
        include: Question,
      });

      let question = await Question.findOne({
        where: { id: Number(answer.questionId) },
      });

      if (!answer) {
        return errorResponse(res, 404, "answer not found", null);
      }

      // this endpoint should only be accessible to the person who asked the question
      if (Number(req.user.id) != question.userId) {
        return errorResponse(res, 401, "unauthorized", null);
      }

      // update the db by removing making the previously accepted answer 'false'
      let prevAcceptedAnswer = await Answer.findOne({
        where: { accepted: true, questionId: answer.questionId },
      });

      if (!prevAcceptedAnswer) {
      } else {
        await prevAcceptedAnswer.set({
          accepted: false,
        });
        prevAcceptedAnswer = await prevAcceptedAnswer.save();
      }

      await answer.set({
        accepted: true,
      });

      await question.set({
        acceptedAnswer: answer.id
      })

      question = await question.save()
      answer = await answer.save();

      return successResponse(res, 200, "successful", {
        answer,
      });
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

module.exports = Answers;
