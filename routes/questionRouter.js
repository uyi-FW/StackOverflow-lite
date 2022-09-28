// importing controller
const questionController = require("../controllers/questionController");

const ValidateQuestion = require("../handler/validator/question");
const checkAuth = require("../handler/middlewares/checkAuth");

// router
const router = require("express").Router();

// routes
router.post(
  "/",
  checkAuth,
  ValidateQuestion.ADD_QUESTION,
  questionController.addQuestion
);

module.exports = router;
