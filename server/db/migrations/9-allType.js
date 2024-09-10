'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AllTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Types',
          key: 'id',
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      fountainId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Fountains',
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
    await queryInterface.dropTable('AllTypes');
  },
};
