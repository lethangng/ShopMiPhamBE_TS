"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productBills = [];

    for (let i = 0; i < 100; i++) {
      productBills.push({
        billId: faker.number.int({ min: 1, max: 30 }),
        productId: faker.number.int({ min: 1, max: 18 }),
        quantity: faker.number.int({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Product_Bills", productBills);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Product_Bills", null, {});
  },
};
