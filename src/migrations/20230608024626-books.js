'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'books',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        isRented: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: 'is_rented',
        },
      },
    );
  },

  down: async (queryInterface, _Sequelize) => {
     await queryInterface.dropTable('books');
  }
};
