'use strict';

const { bcryptHash } = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = bcryptHash('111111');
    const date = new Date();
    
    await queryInterface.bulkInsert('Users', [{
      username: "admin",
      email: "admin@p2.com",
      password: password,
      role: "admin",
      accountType: "manual",
      createdAt: date,
      updatedAt: date
    }], {});

    await queryInterface.bulkInsert('UserDetails', [{
      userId: 1,
      name: "Admin User",
      inumber: "A-2023-1-IPUSTAKA",
      createdAt: date,
      updatedAt: date
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      truncate : true,
      cascade : true,
      restartIdentity : true
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
