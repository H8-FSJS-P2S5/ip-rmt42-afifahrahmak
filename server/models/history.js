'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, { foreignKey: 'userId' });
      History.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  History.init({
    bookId: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `User is required!`
        },
        notNull: {
          msg: `User is required!`
        }
      }
    },
    answer : DataTypes.TEXT,
    question : DataTypes.TEXT,
    point : DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Status is required!`
        },
        notNull: {
          msg: `Status is required!`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};