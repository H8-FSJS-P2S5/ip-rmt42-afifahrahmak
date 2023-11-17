'use strict';

const { hashPassword } = require('../helpers/bcrypt');
const users = require("../data/users.json")


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Users", users.map(el => {
    el.password = hashPassword(el.password)
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
   }))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    })
  }
};
