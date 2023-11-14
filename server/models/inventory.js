'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.belongsTo(models.User, {foreignKey: "UserId"})
      Inventory.belongsTo(models.MusicKit, {foreignKey: "MusicId"})
    }
  }
  Inventory.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "UserId is required",
        notNull: "UserId is required"
      }
    }, 
    MusicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "MusicId is required",
        notNull: "MusicId is required"
      }
    }
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};