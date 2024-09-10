'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fountain extends Model {
    static associate({ City, PlaceInstal, View, PhotoFountain, Type }) {
      this.belongsTo(City, { foreignKey: 'cityId' });
      this.belongsTo(PlaceInstal, { foreignKey: 'placeId' });
      this.belongsTo(View, { foreignKey: 'viewId' });
      this.hasMany(PhotoFountain, { foreignKey: 'fountImageId', as: 'photos' });
      this.belongsToMany(Type, {
        through: 'AllTypes',
        foreignKey: 'fountainId',
        as: 'types'
      });
    }
  }
  Fountain.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    techDescription: DataTypes.TEXT,
    coordinateX: DataTypes.DOUBLE,
    coordinateY: DataTypes.DOUBLE,
    cityId: DataTypes.INTEGER,
    placeId: DataTypes.INTEGER,
    viewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fountain',
  });
  return Fountain;
};