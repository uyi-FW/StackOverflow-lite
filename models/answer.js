"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Answer.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
