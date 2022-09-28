const db = require("../models");
const Comment = db.comment;
const Answer = db.answer;

const { validationResult } = require("express-validator");
const { errorResponse, successResponse } = require("../handler/response");
const Answers = require("./answerController");

class Comments {
  static async addComment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 422, "validation error", errors.mapped());
    }

    try {
      let payload = {
        description: req.body.description,
        userId: req.user.id,
        answerId: req.params.id,
      };

      const answer = await Answer.findOne({ where: { id: req.params.id } });

      if (!answer) {
        return errorResponse(res, 404, "answer not found", null);
      }

      // save to db
      const newComment = await Comment.create(payload);
      return successResponse(res, 201, "successful", newComment);
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async getAllComments(req, res) {
    try {
      // fetch answer from db
      let answer = await Answer.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!answer) {
        return errorResponse(res, 404, "answer not found", null);
      }
      answer = answer.toJSON();

      // find comments
      const comments = await Comment.findAll({
        where: { answerId: Number(req.params.id) },
      });

      // if the answer has no comments
      if (Object.keys(comments).length === 0) {
        return successResponse(res, 201, "no content", {
          answer,
          comments: "this answer has no comments",
        });
      }
      return successResponse(res, 200, "successful", { answer, comments });
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }

  static async getOneComment(req, res) {
    try {
      let comment = await Comment.findOne({
        where: { id: Number(req.params.id) },
        include: Answer,
      });
      if (!comment) {
        return errorResponse(res, 404, "comment not found", null);
      }
      comment = comment.toJSON();

      return successResponse(res, 200, "successful", {
        comment,
      });
    } catch (err) {
      errorResponse(res, 500, "internal server error", err.message);
    }
  }
}

module.exports = Comments;
