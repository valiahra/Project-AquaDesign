"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          firstName: "Максим",
          lastName: "Кошеутов",
          phone: "89152596902",
          email: 'max@mail.ru',
          city: 'Владивосток',
          typeFountain:'Скульптурный',
          comment: 'Хочу большой фонтан, чтобы в центре была расположена фигура Райана Гослинга ',
          budget: "100 000 000",
          square: 30,
          photo: '/gosling.jpg',
          userId: 3,
          status: 'принят',

        },
        {
          firstName: "Вадим",
          lastName: "Глазко",
          phone: "89152596901",
          email: 'vadim@mail.ru',
          city: 'Белгород',
          typeFountain:'Плавающий',
          comment: 'Хочу фонтан на территории своей усадьбы, огромного хомяка, летящего на вишневой слойке',
          budget: "10 000 000",
          square: 20,
          photo: '/hamster.jpg',
          userId: 4,
          status: 'в работе',

        },
        {
          firstName: "Антон",
          lastName: "Атнагулов",
          phone: "89152596907",
          city: 'Казань',
          typeFountain:'Цветомузыкальный',
          comment: 'Мне нужен  фонтан на территории торгового центра',
          budget: "14 000 000",
          square: 20,
          photo: '/anton.jpg',
          userId: 9,
          status: 'в работе',

        },
        {

          firstName: "Мария",
          lastName: "Гришина",
          phone: "89162489406",
          city: 'Калининград',
          typeFountain:'скульптурный',
          comment: 'Мне нужен  фонтан рядом с магазином для животных с маленькими собачками',
          budget: "5 000 000",
          square: 15,
          photo: '/dogs.jpg',
          userId: 5,
          status: 'завершен',

        },
        {
          firstName: "Сергей",
          lastName: "Тарасов",
          phone: "82343456758",
          city: 'Андеграунд',
          typeFountain:'скульптурный',
          comment: 'Добрый день! Мне нужен фонтан около музыкального клуба. Большой слон с зеленой подсветкой.',
          budget: "7 000 000",
          square: 43,
          photo: '/slon.jpg',
          userId: 8,
          status: 'в работе',
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};


