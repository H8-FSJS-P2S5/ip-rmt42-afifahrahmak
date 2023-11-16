'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    const recipes = require("../data/recipe.json");
    recipes.forEach((el) => {
      delete el.number;
      delete el.id;
      el.nutrients = JSON.stringify(el.nutrients);
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
