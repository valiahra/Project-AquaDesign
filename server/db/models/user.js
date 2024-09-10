'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Order, Message }) {
      this.hasMany(Order, { foreignKey: 'userId' });
      this.hasMany(Message, { foreignKey: 'authorId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      isManager: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
