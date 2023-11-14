'use strict';
const axios = require("axios")

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
   const {data} = await axios({
    method: "GET",
    url: "https://spacerulerwill.github.io/CS2-API/api/music_kits.json"
   })

   const arrDatas = []

   for(const key in data) {
    const el = data[key]
    el.name = el.formattedName
    el.bomb10Second = el.audioUrls['Bomb 10 Second Countdown'] ? el.audioUrls['Bomb 10 Second Countdown'] : ''
    el.bombPlanted = el.audioUrls['Bomb Planted'] ? el.audioUrls['Bomb Planted'] : ''
    el.chooseTeam = el.audioUrls["Choose Team"] ? el.audioUrls["Choose Team"] : ""
    el.deathCam = el.audioUrls["Death Cam"] ? el.audioUrls["Death Cam"] : ""
    el.lostRound = el.audioUrls["Lost Round"] ? el.audioUrls["Lost Round"] : ""
    el.mvpAnthem = el.audioUrls["MVP Anthem"] ? el.audioUrls["MVP Anthem"] : ""
    el.mainMenu = el.audioUrls["Main Menu"] ? el.audioUrls["Main Menu"] : ""
    el.round10Second = el.audioUrls["Round 10 Second Countdown"] ? el.audioUrls["Round 10 Second Countdown"] : ""
    el.startAction1 = el.audioUrls["Start Action (Variation 1)"] ? el.audioUrls["Start Action (Variation 1)"] : ""
    el.startAction2 = el.audioUrls["Start Action (Variation 2)"] ? el.audioUrls["Start Action (Variation 2)"] : ""
    el.startAction3 = el.audioUrls["Start Action (Variation 3)"] ? el.audioUrls["Start Action (Variation 3)"] : ""
    el.startRound1 = el.audioUrls["Start Round (Variation 1)"] ? el.audioUrls["Start Round (Variation 1)"] : ""
    el.startRound2 = el.audioUrls["Start Round (Variation 2)"] ? el.audioUrls["Start Round (Variation 2)"] : ""
    el.startRound3 = el.audioUrls["Start Round (Variation 3)"] ? el.audioUrls["Start Round (Variation 3)"] : ""
    el.wonRound = el.audioUrls["Won Round"] ? el.audioUrls["Won Round"] : ""

    el.price = Math.random() * 1000000

    el.createdAt = new Date()
    el.updatedAt = new Date()

    delete el.formattedName
    delete el.rarity
    delete el.stattrakAvailable
    delete el.boxesFoundIn
    delete el.audioUrls
    arrDatas.push(el)
   }
   await queryInterface.bulkInsert("MusicKits", arrDatas)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("MusicKits", null, {})
  }
};
