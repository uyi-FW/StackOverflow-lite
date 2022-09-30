const { body } = require("express-validator");

exports.ADD_QUESTION = [body("description").isString().trim().notEmpty()];

exports.SEARCH_QUESTION = [body("searchTerm").isString().trim().notEmpty()];
