'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Specs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
      },
      display: {
        type: Sequelize.STRING
      },
      os: {
        type: Sequelize.STRING
      },
      chipset: {
        type: Sequelize.STRING
      },
      memory: {
        type: Sequelize.STRING
      },
      camera: {
        type: Sequelize.STRING
      },
      battery: {
        type: Sequelize.STRING
      },
      network: {
        type: Sequelize.STRING
      },
      gadgetId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Gadgets'
          },
          key : 'id'
        }
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
    await queryInterface.dropTable('Specs');
  }
};