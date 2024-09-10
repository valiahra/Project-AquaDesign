'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate({ Fountain }) {
      this.hasMany(Fountain, { foreignKey: 'cityId' });
    }
  }
  City.init({
    nameCity: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};