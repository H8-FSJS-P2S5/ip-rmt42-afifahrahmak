'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MusicKit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MusicKit.hasMany(models.Inventory, {foreignKey: "MusicId"})
    }
  }
  MusicKit.init({
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    bomb10Second: DataTypes.STRING,
    bombPlanted: DataTypes.STRING,
    chooseTeam: DataTypes.STRING,
    deathCam: DataTypes.STRING,
    lostRound: DataTypes.STRING,
    mvpAnthem: DataTypes.STRING,
    mainMenu: DataTypes.STRING,
    round10Second: DataTypes.STRING,
    startAction1: DataTypes.STRING,
    startAction2: DataTypes.STRING,
    startAction3: DataTypes.STRING,
    startRound1: DataTypes.STRING,
    startRound2: DataTypes.STRING,
    startRound3: DataTypes.STRING,
    wonRound: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MusicKit',
  });
  return MusicKit;
};