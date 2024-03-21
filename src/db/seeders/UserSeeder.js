"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          email: "admin@gmail.com",
          password:
            "$2a$12$jRX0GBYAr/XPUAiZYZjnruZ4TT65438891S3g0djTjOEo3wgErdn.", // "admin"
          address: "Thai Binh",
          phone: faker.phone.number("0##########"),
          avatar: "avatar-default.jpg",
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User_1",
          email: "user_1@gmail.com",
          password:
            "$2a$12$wxnc0mT9whF38RhVYOJOc.atdUf7xB5aWh0ngoNt0P0bmQAkRUq0i", // "user1"
          address: "Ha Noi",
          phone: faker.phone.number("0##########"),
          avatar: "avatar-default.jpg",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User_2",
          email: "user_2@gmail.com",
          password:
            "$2a$12$wxnc0mT9whF38RhVYOJOc.atdUf7xB5aWh0ngoNt0P0bmQAkRUq0i", // "user1"
          address: "Nam Dinh",
          phone: faker.phone.number("0##########"),
          avatar: "avatar-default.jpg",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User_3",
          email: "user_3@gmail.com",
          password:
            "$2a$12$wxnc0mT9whF38RhVYOJOc.atdUf7xB5aWh0ngoNt0P0bmQAkRUq0i", // "user1"
          address: "Thanh Hoa",
          phone: faker.phone.number("0##########"),
          avatar: "avatar-default.jpg",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User_4",
          email: "user_4@gmail.com",
          password:
            "$2a$12$wxnc0mT9whF38RhVYOJOc.atdUf7xB5aWh0ngoNt0P0bmQAkRUq0i", // "user1"
          address: "Hai Phong",
          phone: faker.phone.number("0##########"),
          avatar: "avatar-default.jpg",
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
