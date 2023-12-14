'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MusicKits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      imageUrl: {
        type: Sequelize.TEXT
      },
      bomb10Second: {
        type: Sequelize.STRING
      },
      bombPlanted: {
        type: Sequelize.STRING
      },
      chooseTeam: {
        type: Sequelize.STRING
      },
      deathCam: {
        type: Sequelize.STRING
      },
      lostRound: {
        type: Sequelize.STRING
      },
      mvpAnthem: {
        type: Sequelize.STRING
      },
      mainMenu: {
        type: Sequelize.STRING
      },
      round10Second: {
        type: Sequelize.STRING
      },
      startAction1: {
        type: Sequelize.STRING
      },
      startAction2: {
        type: Sequelize.STRING
      },
      startAction3: {
        type: Sequelize.STRING
      },
      startRound1: {
        type: Sequelize.STRING
      },
      startRound2: {
        type: Sequelize.STRING
      },
      startRound3: {
        type: Sequelize.STRING
      },
      wonRound: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('MusicKits');
  }
};