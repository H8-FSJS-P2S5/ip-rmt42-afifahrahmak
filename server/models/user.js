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
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.History, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
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
      unique : true,
      validate : {
        notNull : {
          msg : `Email is required!`
        },
        notEmpty : {
          msg : `Email is required!`
        },
        isEmail : {
          msg : `Must be an email!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg : `Password is required!`
        },
        notEmpty : {
          msg : `Password is required!`
        },
        len : {
          args: [5, Infinity],
          msg: "Password must be at least 5 characters!"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'member',
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