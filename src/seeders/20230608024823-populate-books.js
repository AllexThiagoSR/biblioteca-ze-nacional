'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'books',
      [
        {
          title: 'O Grand Gatsby',
          is_rented: false,
        },{
          title: '1984',
          is_rented: true,
        },
        {
          title: 'Dom Quixote',
          is_rented: false,
        },
        {
          title: 'A Revolução dos Bichs',
          is_rented: false,
        },
        {
          title: 'Cem Anos de Solidao',
          is_rented: true,
        },
        {
          title: 'Ulisses',
          is_rented: false,
        },
        {
          title: 'A Divina Comedia',
          is_rented: true,
        },
        {
          title: 'Em Busca do Tempo Perdido',
          is_rented: false,
        },
        {
          title: 'Moby Dick',
          is_rented: false,
        },
        {
          title: 'O Senhor dos Aneis',
          is_rented: true,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('books', null, {});
  }
};
