'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate({ Fountain }) {
      this.belongsToMany(Fountain, {
        through: 'AllTypes',
        foreignKey: 'typeId',
        as: 'fountains',
      });
    }
  }
  Type.init(
    {
      nameType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Type',
    }
  );
  return Type;
};
