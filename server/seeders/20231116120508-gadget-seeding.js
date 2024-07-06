'use strict';
const fs = require("fs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = JSON.parse(fs.readFileSync('./data/gadget.json', 'utf-8')).map(item => {
      item.createdAt = item.updatedAt = new Date();
      return item;
    });

    await queryInterface.bulkInsert('Gadgets', datas);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gadgets', null, {});
  }
};
