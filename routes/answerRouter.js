const answerController = require("../controllers/answerController")
const ValidateAnswer = require("../handler/validator/answer")
const checkAuth = require("../handler/middlewares/checkAuth");

// router
const router = require("express").Router();

// routes
router.post(
  "/questions/:id/answers",
  checkAuth,
  ValidateAnswer.ADD_ANSWER,
  answerController.addAnswer
);

module.exports = router;
