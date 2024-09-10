module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Views',
      [
        {
          titleView: 'Реальные работы',
        },
        {
          titleView: 'Проекты',
        },
  
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Views', null, {});
  },
};
