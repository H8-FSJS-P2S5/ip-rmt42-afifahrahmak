'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const comments = require("../data/comment.json");
    comments.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    })

    await queryInterface.bulkInsert("Comments", comments);
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Comments", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });

  }
};
