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

router.get("/", checkAuth, questionController.getAll);

router.get("/me", checkAuth, questionController.getMine);

router.get("/:id", checkAuth, questionController.getOne);

router.delete("/:id", checkAuth, questionController.deleteQuestion);

router.post("/search", questionController.searchForQuestion)


module.exports = router;
