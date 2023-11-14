'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({

    username: {
      type: DataTypes.STRING,
      defaultValue: "ViCYTOr"
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email cannot be Empty!"
        },
        notEmpty: {
          msg: "Email cannot be Empty!"
        },
        isEmail: {
          msg: "Email should be written in email format!"
        }
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be Empty!"
        },
        notEmpty: {
          msg: "Password cannot be Empty!"
        },
        len: {
          args: [8],
          msg: "Minimum password length is 8"
        }
      }
    }

  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  })

  return User;
};