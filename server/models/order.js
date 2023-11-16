'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {foreignKey: "UserId"})
      Order.belongsTo(models.MusicKit, {foreignKey: "MusicId"})
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    MusicId: DataTypes.INTEGER,
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "orderId is required"},
        notNull: {msg: "orderId is required"}
      }
    }, 
    amount: DataTypes.STRING,
    status: DataTypes.STRING,
    paidDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};