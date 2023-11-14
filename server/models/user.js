'use strict';
const {
  Model
} = require('sequelize');
const { bcryptHash } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail, {
        foreignKey: 'userId'
      });
      User.hasMany(models.History, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Username is required!`
        },
        notNull: {
          msg: `Username is required!`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Email is required!`
        },
        notNull: {
          msg: `Email is required!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password is required!`
        },
        notNull: {
          msg: `Password is required!`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Role is required!`
        },
        notNull: {
          msg: `Role is required!`
        }
      }
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['manual', 'google']], 
      } 
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = bcryptHash(user.password);
  });

  return User;
};