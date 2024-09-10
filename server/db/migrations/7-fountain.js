'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fountains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      techDescription: {
        type: Sequelize.TEXT,
      },
      coordinateX: {
        type: Sequelize.DOUBLE,
      },
      coordinateY: {
        type: Sequelize.DOUBLE,
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cities',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      placeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PlaceInstals',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      viewId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Views',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fountains');
  },
};
