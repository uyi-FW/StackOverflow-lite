const express = require("express");
const router = express.Router();

const userRoute = require('./userRouter')
const questionRoute = require('./questionRouter')
const answerRoute = require('./answerRouter')
const commentRoute = require('./commentRouter')

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/', answerRoute)
router.use('/', commentRoute)

module.exports = router;
