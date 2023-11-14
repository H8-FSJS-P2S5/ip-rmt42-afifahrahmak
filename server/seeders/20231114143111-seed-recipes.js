'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const recipes = require("../data/recipe.json");
    recipes.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    })

    await queryInterface.bulkInsert("Recipes", recipes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Recipes", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
