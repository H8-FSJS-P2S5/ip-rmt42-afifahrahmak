'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {foreignKey: 'UserId'})
      Post.belongsTo(models.Category, {foreignKey: 'CategoryId'})
      Post.hasMany(models.Comment, {foreignKey: 'PostId'})
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title is required'
        },
        notEmpty: {
          msg: 'Title is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required'
        },
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    CategoryId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please select a category'
        },
        notEmpty: {
          msg: 'Please select a category'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};