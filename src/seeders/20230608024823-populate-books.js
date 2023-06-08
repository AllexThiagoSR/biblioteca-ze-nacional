'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'books',
      [
        {
          title: 'O Grand Gatsby',
          is_rental: false,
        },{
          title: '1984',
          is_rental: true,
        },
        {
          title: 'Dom Quixote',
          is_rental: false,
        },
        {
          title: 'A Revolução dos Bichs',
          is_rental: false,
        },
        {
          title: 'Cem Anos de Solidao',
          is_rental: true,
        },
        {
          title: 'Ulisses',
          is_rental: false,
        },
        {
          title: 'A Divina Comedia',
          is_rental: true,
        },
        {
          title: 'Em Busca do Tempo Perdido',
          is_rental: false,
        },
        {
          title: 'Moby Dick',
          is_rental: false,
        },
        {
          title: 'O Senhor dos Aneis',
          is_rental: true,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
  }
};
