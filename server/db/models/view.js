'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    static associate({ Fountain }) {
      this.hasMany(Fountain, { foreignKey: 'viewId' });
    }
  }
  View.init({
    titleView: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'View',
  });
  return View;
};