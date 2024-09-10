const router = require('express').Router();
const { Fountain, Type, City, PhotoFountain, PlaceInstal } = require('../../db/models');
const { Op } = require('sequelize');
router

.get('/selection', async (req, res) => {
  const { places, types } = req.query;
  try {
    const where = {};
    if (places) {
      where.placeId = { [Op.in]: places.split(',') };
    }
    const fountains = await Fountain.findAll({
      include: [
        { model: City, as: 'City', attributes: ['id', 'nameCity'] },
        { model: PhotoFountain, as: 'photos', attributes: ['id', 'image'] },
        {
          model: Type,
          as: 'types',
          through: { attributes: [] },
          where: types? { id: { [Op.in]: types.split(',') } } : undefined,
        },
      ],
      where,
    });
    res.send(fountains);
  } catch (error) {
    console.error('Ошибка fetch fountains:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
})
  .get('/types', async (req, res) => {
    try {
      const types = await Type.findAll({
        attributes: ['id', 'nameType'],
      });
      res.json(types);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
   })
   .get('/places', async (req, res) => {
    try {
      const places = await PlaceInstal.findAll({
        attributes: ['id', 'place'],
      });
      res.json(places);
    } catch (error) {
      console.error('Ошибка fetch places:', error);
      res.sendStatus(400);
    }
   })
  // все типы фонтанов
.get('/selection/type/:typeId', async (req, res) => {
    const { typeId } = req.params;
    if (isNaN(typeId)) {
      return res.status(400).json({ error: 'Неправильное id типа фонтана' });
    }
    try {
      const fountains = await Fountain.findAll({
        include: [
          {
            model: Type,
            as: 'types',
            where: {
              id: typeId,
            },
          },
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
      console.error('Error fetching fountains by type:', error);
      res.sendStatus(400);
    }
  })
  
  .get('/selection/place/:placeId', async (req, res) => {
    const { placeId } = req.params;
    if (isNaN(placeId)) {
      return res.status(400).json({ error: 'Неправильное id места фонтана' });
    }
    try {
      const fountains = await Fountain.findAll({
        where: {
          placeId: placeId,
        },
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
      console.error('Error fetching fountains by place:', error);
      res.sendStatus(400);
    }
  })
  
  .get('/selection/type/:typeId/place/:placeId', async (req, res) => {
    const { typeId, placeId } = req.params;
    if (isNaN(typeId) || isNaN(placeId)) {
      return res.status(400).json({ error: 'Неправильное id типа или места фонтана' });
    }
    try {
      const fountains = await Fountain.findAll({
        include: [
          {
            model: Type,
            as: 'types',
            where: {
              id: typeId,
            },
          },
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
        where: {
          placeId: placeId,
        },
      });
      res.json(fountains);
    } catch (error) {
      console.error('Error fetching fountains by type and place:', error);
      res.sendStatus(400);
    }
  })

  module.exports = router;