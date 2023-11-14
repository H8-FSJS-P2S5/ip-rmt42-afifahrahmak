'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(10000)
      },
      prepareTime: {
        type: Sequelize.INTEGER
      },
      cookTime: {
        type: Sequelize.INTEGER
      },
      ingredients: {
        type: Sequelize.STRING(10000)
      },
      steps: {
        type: Sequelize.STRING(10000)
      },
      nutrients: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING(10000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};