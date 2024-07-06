'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = JSON.parse(fs.readFileSync('./data/review.json', 'utf-8')).map(item => {
      item.createdAt = item.updatedAt = new Date();
      return item;
    });

    await queryInterface.bulkInsert('Reviews', datas);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
