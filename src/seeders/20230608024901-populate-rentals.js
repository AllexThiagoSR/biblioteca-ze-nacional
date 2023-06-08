'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'rentals',
      [
        {
          book_id: 2,
          user_id: 1,
          rental_date: '2023-05-01',
          returned_at: null,
        },
        {
          book_id: 5,
          user_id: 3,
          rental_date: '2023-05-03',
          returned_at: null,
        },
        {
          book_id: 7,
          user_id: 2,
          rental_date: '2023-05-05',
          returned_at: null,
        },
        {
          book_id: 1,
          user_id: 2,
          rental_date: '2023-05-01',
          returned_at: '2023-05-05',
        },
        {
          book_id: 10,
          user_id: 9,
          rental_date: '2023-05-01',
          returned_at: null,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('rentals', null, {});
  }
};
