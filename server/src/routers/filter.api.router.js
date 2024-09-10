const router = require('express').Router();
const { mapWhereFieldNames } = require('sequelize/lib/utils');
const { Fountain, Type, City, PhotoFountain, PlaceInstal,View } = require('../../db/models');
const { Op } = require('sequelize');
router

.get('/filter', async (req, res) => {
  const { cities } = req.query;
  try {
    const where = {};
    if (cities) {
      where.cityId = { [Op.in]: cities.split(',') };
    }
    const fountains = await Fountain.findAll({
      include: [
        { model: City, as: 'City', attributes: ['id', 'nameCity'] },
        { model: PhotoFountain, as: 'photos', attributes: ['id', 'image'] },
        { model: View, where: {titleView: 'Реальные работы'}},
      ],
      where,
    });
    res.send(fountains);
  } catch (error) {
    console.error('Ошибка fetch fountains:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
})
     // все города
  .get('/cities', async (req, res) => {
    try {
      const cities = await City.findAll({
        attributes: ['id', 'nameCity'],
      });
      res.json(cities);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .get('/filter/city/:cityId', async (req, res) => {
    const { cityId } = req.params;
    if (isNaN(cityId)) {
      return res.status(400).json({ error: 'Неправильное id места фонтана' });
    }
    try {
      const fountains = await Fountain.findAll({
        where: {
          cityId: cityId,
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
      console.error('Error fetching fountains by cities:', error);
      res.sendStatus(400);
    }
  })
  


  module.exports = router;