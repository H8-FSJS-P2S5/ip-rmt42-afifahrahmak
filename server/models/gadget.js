'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gadget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gadget.hasMany(models.Review, {foreignKey: "gadgetId" , onDelete: 'CASCADE'})
      Gadget.hasOne(models.Spec, { foreignKey: "gadgetId", onDelete: 'CASCADE' })
      Gadget.belongsTo(models.Category, {foreignKey: "categoryId"})

    }
  }
  Gadget.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gadget',
  });
  return Gadget;
};