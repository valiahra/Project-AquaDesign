"use strict";
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Менеджер В.",
          email: 'manager@mail.ru',
          phone:'89152596901',
          password: await bcrypt.hash('Manager123', 10),
          isAdmin:false,
          isManager:true,
        },
        {
          username: "Admin",
          email: 'admin@mail.ru',
          phone:'89152596902',
          password: await bcrypt.hash('Admin123', 10),
          isAdmin:true,
          isManager:false,
        },
        {
          username: "Максим Кошеутов",
          email: 'max@mail.ru',
          phone:'89152596903',
          password: await bcrypt.hash('Max12345', 10),
          isAdmin:false,
          isManager:false,
        },
        {
          username: "Вадим Глазко",
          email: 'vadim@mail.ru',
          phone:'89152596903',
          password: await bcrypt.hash('Vadim12345', 10),
          isAdmin:false,
          isManager:false,
        },
        {
          username: "Мария Гришина",
          email: 'maria@mail.ru',
          phone:'89152596907',
          password: await bcrypt.hash('maria12345', 10),
          isAdmin:false,
          isManager:false,
        },
        {
          username: "Эдуард Хисматов",
          email: 'ed@mail.ru',
          phone:'89152596907',
          password: await bcrypt.hash('ed12345', 10),
          isAdmin:false,
          isManager:false,
        },
        {
          username: "Юлия Амельченко",
          email: 'amel@mail.ru',
          phone:'89152596907',
          password: await bcrypt.hash('amel12345', 10),
          isAdmin:false,
          isManager:false,
        },
        {
          username: "Сергей Тарасов",
          email: 'serg@mail.ru',
          phone:'89152596907',
          password: await bcrypt.hash('serg12345', 10),
          isAdmin:false,
          isManager:false,
        },
        {
          username: "Антон Атнагулов",
          email: 'anton@mail.ru',
          phone:'89152596907',
          password: await bcrypt.hash('anton12345', 10),
          isAdmin:false,
          isManager:false,
        },
        {
          username: "Коньков Алексей",
          email: 'konk@mail.ru',
          phone:'89152596907',
          password: await bcrypt.hash('konk12345', 10),
          isAdmin:false,
          isManager:false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
