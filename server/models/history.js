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
      History.belongsTo(models.User);
      History.belongsTo(models.Book);
    }
  }
  History.init({
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Book is required!`
        },
        notNull: {
          msg: `Book is required!`
        }
      }
    },
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
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Deadline is required!`
        },
        notNull: {
          msg: `Deadline is required!`
        }
      }
    },
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