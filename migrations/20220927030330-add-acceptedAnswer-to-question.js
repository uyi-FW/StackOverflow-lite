'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Questions", {
      fields: ["acceptedAnswer"],
      type: "foreign key",
      name: "FK_acceptedAnswer_question",
      references: {
        //Required field
        table: "Answers",
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
    await queryInterface.removeConstraint(
      "Questions",
      "FK_acceptedAnswer_question"
    );
  }
};
