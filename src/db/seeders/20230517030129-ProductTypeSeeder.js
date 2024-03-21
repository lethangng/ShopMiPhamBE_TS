"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProductTypes",
      [
        {
          name: "Son môi",
          description: "Son môi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Son dưỡng",
          description: "Son dưỡng",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nước tẩy trang",
          description: "Nước tẩy trang",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sữa rửa mặt",
          description: "Sữa rửa mặt",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kem dưỡng ẩm",
          description: "Kem dưỡng ẩm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kem chống nắng",
          description: "Kem chống nắng",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kẻ mày",
          description: "Kẻ mày",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toner",
          description: "Toner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kem lót",
          description: "Kem lót",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kem nền",
          description: "Kem nền",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Phấn phủ",
          description: "Phấn phủ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mascara",
          description: "Mascara",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductTypes", null, {});
  },
};
