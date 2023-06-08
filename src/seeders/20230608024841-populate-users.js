'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'Sobrinho do seu Ze',
          password: '123456',
          role: 1,
        },
        {
          username: 'Seu Ze',
          password: '123456',
          role: 1,
        },
        {
          username: 'johnsmith',
          password: 'B@1P45sw',
          role: 2,
        },
        {
          username: 'janedoe',
          password: 'P@ssw0rd!',
          role: 2,
        },
        {
          username: 'michaelbrown',
          password: 'Secur3P@ss',
          role: 2,
        },
        {
          username: 'emilyjones',
          password: 'MyP@ss123',
          role: 2,
        },
        {
          username: 'davidwilson',
          password: 'P@ssw0rd!',
          role: 2,
        },
        {
          username: 'sarahthomas',
          password: 'SecretP@ss',
          role: 2,
        },
        {
          username: 'robertrobinson',
          password: 'P@ssw0rd123',
          role: 2,
        },
        {
          username: 'olivialopez',
          password: 'P@ssw0rd!',
          role: 2,
        },
        {
          username: 'williammartinez',
          password: '12345678',
          role: 2,
        },
        {
          username: 'sophiawalker',
          password: 'P@ssw0rd!',
          role: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
