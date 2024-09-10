'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaceInstal extends Model {
    static associate({ Fountain }) {
      this.hasMany(Fountain, { foreignKey: 'placeId' });
    }
  }
  PlaceInstal.init({
    place: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlaceInstal',
  });
  return PlaceInstal;
};