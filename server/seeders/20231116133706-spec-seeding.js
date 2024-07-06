'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = JSON.parse(fs.readFileSync('./data/spec.json', 'utf-8')).map(item => {
      item.createdAt = item.updatedAt = new Date();
      return item;
    });

    await queryInterface.bulkInsert('Specs', datas);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Specs', null, {});
  }
};
