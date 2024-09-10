'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhotoFountain extends Model {
    static associate({ Fountain }) {
      this.belongsTo(Fountain, { foreignKey: 'fountImageId', as: 'fountain' });
    }
  }
  PhotoFountain.init({
    image: DataTypes.STRING,
    fountImageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PhotoFountain',
  });
  return PhotoFountain;
};