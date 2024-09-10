module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Cities',
      [
        {
          nameCity: 'Алматы',
        },
        {
          nameCity: 'Москва',
        },
        {
          nameCity: 'Белгород',
        },
        {
          nameCity: 'Астана',
        },
        {
          nameCity: 'Кемерово',
        },
        {
          nameCity: 'Пермь',
        },
        {
          nameCity: 'Архангельск',
        },
        {
          nameCity: 'Сургут',
        },
        {
          nameCity: 'Новокузнецк',
        },
        {
          nameCity: 'Новосибирск',
        },
        {
          nameCity: 'Ставрополь',
        },
        {
          nameCity: 'Уфа',
        },
        {
          nameCity: 'Рязань',
        },
        {
          nameCity: 'Тула',
        },
        {
          nameCity: 'Калуга',
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Cities', null, {});
  },
};
