'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Order.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    typeFountain: DataTypes.STRING,
    comment: DataTypes.TEXT,
    budget: DataTypes.STRING,
    square: DataTypes.FLOAT,
    photo: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};