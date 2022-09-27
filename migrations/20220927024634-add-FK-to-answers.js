'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addConstraint("Answers", {
      fields: ["userId"],
      type: "foreign key",
      name: "FK_userId_answer",
      references: {
        //Required field
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("Answers", {
      fields: ["questionId"],
      type: "foreign key",
      name: "FK_questionId_answer",
      references: {
        //Required field
        table: "Questions",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Answers", "FK_userId_answer");
    await queryInterface.removeConstraint("Answers", "FK_questionId_answer");
  }
};
