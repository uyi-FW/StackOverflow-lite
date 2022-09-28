"use strict";

const fs = require("fs");
const path = require("path");
const {Sequelize, DataTypes} = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, DataTypes);
db.question = require('./question')(sequelize, DataTypes);
db.answer = require('./answer')(sequelize, DataTypes);
db.comment = require('./comment')(sequelize, DataTypes)

// One-To-Many Relationship between User and Question
db.user.hasMany(db.question)
db.question.belongsTo(db.user)

// One-To-Many Relationship between User and Answer
db.user.hasMany(db.answer)
db.answer.belongsTo(db.user)

// One-To-Many Relationship between Question and Answer
db.question.hasMany(db.answer)
db.answer.belongsTo(db.question)

// One-To-Many Relationship between User and Comment
db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

// One-To-Many Relationship between Answer and Comment
db.answer.hasMany(db.comment);
db.comment.belongsTo(db.answer);

module.exports = db;
