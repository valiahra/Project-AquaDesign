'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllType extends Model {
    static associate(models) {
      // define association here
    }
  }
  AllType.init(
    {
      typeId: DataTypes.INTEGER,
      fountainId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AllType',
    }
  );
  return AllType;
};
