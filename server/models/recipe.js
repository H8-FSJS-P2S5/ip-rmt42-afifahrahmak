'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(10000),
    prepareTime: DataTypes.INTEGER,
    cookTime: DataTypes.INTEGER,
    ingredients: DataTypes.STRING(10000),
    steps: DataTypes.STRING(10000),
    nutrients: DataTypes.STRING,
    image: DataTypes.STRING(10000)
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};