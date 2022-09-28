const answerController = require("../controllers/answerController")
const ValidateAnswer = require("../handler/validator/answer")
const checkAuth = require("../handler/middlewares/checkAuth");
const { check } = require("express-validator");

// router
const router = require("express").Router();

// routes
router.post(
  "/questions/:id/answers",
  checkAuth,
  ValidateAnswer.ADD_ANSWER,
  answerController.addAnswer
);

router.get("/questions/:id/answers",
  checkAuth,
  answerController.getAllAnswers
);

router.get(
  "/answers/:id",
  checkAuth,
  answerController.getOneAnswer
);

router.post(
  "/answers/:id/accept",
  checkAuth,
  answerController.acceptAnswer)

router.put(
  "/answers/:id/upvote",
  checkAuth,
  answerController.upvoteAnswer
)

router.put(
  "/answers/:id/downvote",
  checkAuth,
  answerController.downvoteAnswer
)

module.exports = router;
