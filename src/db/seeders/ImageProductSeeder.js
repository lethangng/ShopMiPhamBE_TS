"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const imageProducts = [];

    for (let i = 0; i < 18; i++) {
      imageProducts.push({
        productId: i,
        image: "add-product.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("ImageProducts", imageProducts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ImageProducts", null, {});
  },
};
