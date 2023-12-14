'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          },
          key: "id"
        }
      },
      MusicId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "MusicKits"
          },
          key: "id"
        }
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      paidDate: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Orders');
  }
};