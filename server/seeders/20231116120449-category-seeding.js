'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = JSON.parse(fs.readFileSync('./data/category.json', 'utf-8')).map(item => {
      item.createdAt = item.updatedAt = new Date();
      return item;
    });

    await queryInterface.bulkInsert('Categories', datas);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
