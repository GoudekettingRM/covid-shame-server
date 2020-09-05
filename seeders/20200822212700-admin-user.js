'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Robinimus',
        email: 'r.goudeketting@gmail.com',
        passwordHash:
          '$2b$10$Pw5rYxPVaHMNIb2TS77bOOXAqzQ/A4.dkszExJqMyYf/mbTVocnhq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'test1',
        email: '1@1.com',
        passwordHash:
          '$2b$10$Pw5rYxPVaHMNIb2TS77bOOXAqzQ/A4.dkszExJqMyYf/mbTVocnhq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'test2',
        email: '2@2.com',
        passwordHash:
          '$2b$10$Pw5rYxPVaHMNIb2TS77bOOXAqzQ/A4.dkszExJqMyYf/mbTVocnhq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'test3',
        email: '3@3.com',
        passwordHash:
          '$2b$10$Pw5rYxPVaHMNIb2TS77bOOXAqzQ/A4.dkszExJqMyYf/mbTVocnhq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
