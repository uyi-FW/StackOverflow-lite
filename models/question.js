"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      });
    }
  }

  Question.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: User,
        //   key: "userId",
        // },
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );

  return Question;
};
