'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.History, {
        foreignKey: 'bookId'
      });
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Title is required!`
        },
        notNull: {
          msg: `Title is required!`
        }
      }
    },
    isbn: DataTypes.STRING,
    author: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    pageCount: DataTypes.INTEGER,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Stock is required!`
        },
        notNull: {
          msg: `Stock is required!`
        }
      }
    },
    publisher: DataTypes.STRING,
    publishedDate: DataTypes.STRING,
    lang: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
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
    category: DataTypes.STRING,
    pricePerWeek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Price per week is required!`
        },
        notNull: {
          msg: `Price per week is required!`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};