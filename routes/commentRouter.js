const commentController = require("../controllers/commentController");
const ValidateComment = require("../handler/validator/comment");
const checkAuth = require("../handler/middlewares/checkAuth");

// router
const router = require("express").Router();

// routes
router.post(
  "/answers/:id/comments",
  checkAuth,
  ValidateComment.ADD_COMMENT,
  commentController.addComment
);

router.get(
  "/answers/:id/comments",
  checkAuth,
  commentController.getAllComments
);

router.get("/comments/:id", checkAuth, commentController.getOneComment);

module.exports = router;
