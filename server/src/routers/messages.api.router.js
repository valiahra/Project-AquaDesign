const router = require('express').Router();
const { Message, User } = require('../../db/models');
// const { Op } = require('sequelize');
// const { verifyAccessToken } = require('../middlewares/verifyToken');

router.get('/', async (req, res) => {
  const messages = await Message.findAll({
    include: User,
    order: [['id', 'ASC']], // сортировка по возрастанию id
  });
  res.json(messages);
});

module.exports = router;

// .get('/:id', verifyAccessToken, async (req, res) => {
//   const { id } = req.params;
//   const messages = await Message.findAll({
//     where: {
//       [Op.or]: [{ authorId: id }, { authorId: 1 }],
//     },
//     include: User,
//   });
//   res.json(messages);
// });
