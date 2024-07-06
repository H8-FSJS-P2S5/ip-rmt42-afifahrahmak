'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spec.belongsTo(models.Gadget, { foreignKey: "gadgetId" })
    }
  }
  Spec.init({
    weight: DataTypes.INTEGER,
    display: DataTypes.STRING,
    os: DataTypes.STRING,
    chipset: DataTypes.STRING,
    memory: DataTypes.STRING,
    camera: DataTypes.STRING,
    battery: DataTypes.STRING,
    network: DataTypes.STRING,
    gadgetId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spec',
  });
  return Spec;
};