const express = require("express");
const router = express.Router();

const userRoute = require('./userRouter')
const questionRoute = require('./questionRouter')

router.use('/users', userRoute)
router.use('/questions', questionRoute)

module.exports = router;
