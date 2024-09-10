module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Types',
      [
        {
          nameType: 'Цветомузыкальный', 
        },
        {
          nameType: 'Цветодинамический', 
        },
        {
          nameType: 'Классический', 
        },
        {
          nameType: 'Пешеходный', 
        },
        {
          nameType: 'Плавающий', 
        },
        {
          nameType: 'Огненный', 
        },
        {
          nameType: 'Водопады и каскады', 
        },
        {
          nameType: 'Цифровой водопад', 
        },
        {
          nameType: 'Водоемы', 
        },
        {
          nameType: 'Скульптурный', 
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Types', null, {});
  },
};