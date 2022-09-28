const express = require("express");
const router = express.Router();

const userRoute = require('./userRouter')
const questionRoute = require('./questionRouter')
const answerRoute = require('./answerRouter')

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('', answerRoute)

module.exports = router;
