'use strict';

const fs = require("fs");
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  
  async up (queryInterface, Sequelize) {
    let datas = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8')).map(item => {
      item.password = hashPassword(item.password)
      item.createdAt = item.updatedAt = new Date();
      console.log("seeder user start", item)
      return item;
    });

    await queryInterface.bulkInsert('Users', datas);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
