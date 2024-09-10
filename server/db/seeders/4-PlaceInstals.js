module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'PlaceInstals',
      [
        {
          place: 'Городская площадь', 
        },
        {
          place: 'Торговый центр', 
        },
        {
          place: 'Парк', 
        },
        {
          place: 'Реки и озёра', 
        },
        {
          place: 'Жилые комплексы', 
        },
        {
          place: 'Частные дома', 
        },
        {
          place: 'Отели и рестораны', 
        },
        {
          place: 'Бассейны', 
        },
        {
          place: 'Стадионы', 
        },
        {
          place: 'Детские площадки', 
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('PlaceInstals', null, {});
  },
};
