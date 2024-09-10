const router = require('express').Router();
const { Fountain, Type, City, PhotoFountain } = require('../../db/models');
// const { verifyAccessToken } = require('../middlewares/verifyToken');
// const { checkAdmin } = require('../middlewares/isAdmin');

router
  // все Наши работы
  .get('/', async (req, res) => {
    try {
      const fountains = await Fountain.findAll({
        include: [
          {
            model: City,
            attributes: ['id', 'nameCity'],
          },
          {
            model: PhotoFountain,
            as: 'photos',
            attributes: ['id', 'image'],
          },
        ],
      });
      res.json(fountains);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  // все города
  // .get('/cities', async (req, res) => {
  //   try {
  //     const cities = await City.findAll({
  //       attributes: ['id', 'nameCity'],
  //     });
  //     res.json(cities);
  //   } catch (error) {
  //     console.error(error);
  //     res.sendStatus(400);
  //   }
  // })
  //   один фонтан по id
.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const fountain = await Fountain.findOne({
      where: { id },
      include: [
        {
          model: City,
          attributes: ['id', 'nameCity'],
        },
        {
          model: PhotoFountain,
          as: 'photos',
          attributes: ['id', 'image'],
        },
      ],
    });
    res.json(fountain);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
  //   разделение для проектов и реальных работ
  .get('/view/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const fountains = await Fountain.findAll({
        where: { viewId: id },
        include: [
          {
            model: City,
            attributes: ['id', 'nameCity'],
          },
          {
            model: PhotoFountain,
            as: 'photos',
            attributes: ['id', 'image'],
          },
        ],
      });
      res.json(fountains);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Fountain.findOne({ where: { id } });
      order.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });


module.exports = router;
