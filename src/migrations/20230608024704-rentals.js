'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'rentals',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          field: 'user_id',
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'users',
            key: 'id'
          },
        },
        bookId: {
          field: 'book_id',
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'books',
            key: 'id',
          },
        },
        rentalDate: {
          type: Sequelize.DATE,
          field: 'rental_date',
          defaultValue: null,
        },
        returnedAt: {
          field: 'returned_at',
          type: Sequelize.DATE,
          defaultValue: null,
        }
      },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('rentals');
  }
};
