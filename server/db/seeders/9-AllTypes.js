module.exports = {
    async up(queryInterface) {
      await queryInterface.bulkInsert(
        'AllTypes',
        [
    
          {
            typeId: 4,
            fountainId: 1,
          },
          {
            typeId: 8,
            fountainId: 2,
          },
          {
            typeId: 7,
            fountainId: 3,
          },
          {
            typeId: 3,
            fountainId: 4,
          },
          {
            typeId: 2,
            fountainId: 4,
          },
          {
            typeId: 2,
            fountainId: 5,
          },
          {
            typeId: 4,
            fountainId: 5,
          },
          {
            typeId: 1,
            fountainId: 6,
          },
          {
            typeId: 3,
            fountainId: 6,
          },
          {
            typeId: 2,
            fountainId: 7,
          },
          {
            typeId: 5,
            fountainId: 7,
          },
          {
            typeId: 2,
            fountainId: 8,
          },
          {
            typeId: 4,
            fountainId: 8,
          },
          {
            typeId: 1,
            fountainId: 9,
          },
          {
            typeId: 3,
            fountainId: 9,
          },
          {
            typeId: 2,
            fountainId: 10,
          },
          {
            typeId: 4,
            fountainId: 10,
          },
          {
            typeId: 2,
            fountainId: 11,
          },
          {
            typeId: 5,
            fountainId: 11,
          },
          {
            typeId: 10,
            fountainId: 12,
          },
          {
            typeId: 4,
            fountainId: 12,
          },
          {
            typeId: 2,
            fountainId: 12,
          },
          {
            typeId: 1,
            fountainId: 13,
          },
          {
            typeId: 4,
            fountainId: 13,
          },
          {
            typeId: 1,
            fountainId: 14,
          },
          {
            typeId: 4,
            fountainId: 14,
          },
          {
            typeId: 9,
            fountainId: 15,
          },
          {
            typeId: 8,
            fountainId: 16,
          },
          {
            typeId: 2,
            fountainId: 17,
          },
          {
            typeId: 7,
            fountainId: 17,
          },
          {
            typeId: 2,
            fountainId: 18,
          },
          {
            typeId: 3,
            fountainId: 18,
          },
          {
            typeId: 4,
            fountainId: 18,
          },
          {
            typeId: 10,
            fountainId: 18,
          },
          {
            typeId: 2,
            fountainId: 19,
          },
          {
            typeId: 3,
            fountainId: 19,
          },
          {
            typeId: 9,
            fountainId: 20,
          },
          {
            typeId: 1,
            fountainId: 21,
          },
          {
            typeId: 4,
            fountainId: 21,
          },
          {
            typeId: 2,
            fountainId: 22,
          },
          {
            typeId: 3,
            fountainId: 22,
          },
          {
            typeId: 2,
            fountainId: 23,
          },
          {
            typeId: 3,
            fountainId: 23,
          },
          {
            typeId: 1,
            fountainId: 24,
          },
          {
            typeId: 3,
            fountainId: 24,
          },
          {
            typeId: 2,
            fountainId: 25,
          },
          {
            typeId: 5,
            fountainId: 25,
          },
          {
            typeId: 1,
            fountainId: 26,
          },
          {
            typeId: 4,
            fountainId: 26,
          },
          {
            typeId: 2,
            fountainId: 27,
          },
          {
            typeId: 3,
            fountainId: 27,
          },
          {
            typeId: 10,
            fountainId: 27,
          },
          {
            typeId: 2,
            fountainId: 28,
          },
          {
            typeId: 4,
            fountainId: 28,
          },
          {
            typeId: 7,
            fountainId: 29,
          },
          {
            typeId: 9,
            fountainId: 29,
          },
          {
            typeId: 1,
            fountainId: 30,
          },
          {
            typeId: 4,
            fountainId: 30,
          },
        ],
        {},
      );
    },
  
    async down(queryInterface) {
      await queryInterface.bulkDelete('AllTypes', null, {});
    },
  };
  