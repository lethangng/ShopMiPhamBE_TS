"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bills = [];

    for (let i = 0; i < 30; i++) {
      bills.push({
        purchaseDate: faker.date.between({
          from: "2021-01-01",
          to: "2023-12-31",
        }),
        totalMoney: faker.number.int({
          min: 100000,
          max: 10000000,
        }),
        userId: faker.number.int({ min: 2, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Bills", bills);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bills", null, {});
  },
};
