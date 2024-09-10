const router = require('express').Router();
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { checkAdmin } = require('../middlewares/isAdmin');
const upload = require('../middlewares/multer')
const {
  Fountain,
  Type,
  City,
  PhotoFountain,
  PlaceInstal,
  View,
  AllType,
} = require('../../db/models');

router
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
          {
            model: PlaceInstal,
            attributes: ['id', 'place'],
          },
          {
            model: View,
            attributes: ['id', 'titleView'],
          },
          {
            model: Type,
            as: 'types',
            attributes: ['id', 'nameType'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
      res.json(fountains);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/newFountain', verifyAccessToken, checkAdmin, upload.array('images'), async (req, res) => {
    const {
      title,
      description,
      techDescription,
      coordinateX,
      coordinateY,
      nameCity,
      place,
      titleView,
      nameType,
    } = req.body;

    try {
      const [city] = await City.findOrCreate({
        where: { nameCity },
        defaults: {
          nameCity,
        },
      });
      const [placeName] = await PlaceInstal.findOrCreate({
        where: { place },
        defaults: {
          place,
        },
      });
      const [view] = await View.findOrCreate({
        where: { titleView },
        defaults: {
          titleView,
        },
      });
      const cityId = city.id;
      const placeId = placeName.id;
      const viewId = view.id;
      
      const newFountain = await Fountain.create({
        title,
        description,
        techDescription,
        coordinateX,
        coordinateY,
        cityId,
        placeId,
        viewId,
      });
      if (req.files) {
        req.files.forEach(async (file) => {
          const newPhoto = await PhotoFountain.findOrCreate({
            where: {
              image: `http://localhost:3200/img/${file.filename}`,
              fountImageId: newFountain.id,
            },
            defaults: {
              image: `http://localhost:3200/img/${file.filename}`,
              fountImageId: newFountain.id,
            },
          });
          console.log(`Image filename: ${file.filename}`);
        });
      }
      
      const arrType = nameType.split(', ');
      await Promise.all(
        arrType.map(async (el) => {
          const [type] = await Type.findOrCreate({
            where: { nameType: el },
            defaults: { nameType: el },
          });
          await AllType.create({
            typeId: type.id,
            fountainId: newFountain.id,
          });
        })
      );
      const allInputsFountains = await Fountain.findOne({
        where: { id: newFountain.id },
        include: [
          { model: City, attributes: ['id', 'nameCity'] },
          { model: PhotoFountain, as: 'photos', attributes: ['id', 'image'] },
          { model: PlaceInstal, attributes: ['id', 'place'] },
          { model: View, attributes: ['id', 'titleView'] },
          { model: Type, as: 'types', attributes: ['id', 'nameType'] },
        ],
      });

      res.json(allInputsFountains);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .put('/:id', verifyAccessToken, checkAdmin, upload.array('images'), async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      techDescription,
      coordinateX,
      coordinateY,
      nameCity,
      place,
      titleView,
      nameType,
    } = req.body;
    try {
      const fountain = await Fountain.findByPk(Number(id));
      if (fountain) {
        const [city] = await City.findOrCreate({
          where: { nameCity },
          defaults: {
            nameCity,
          },
        });
        const [placeName] = await PlaceInstal.findOrCreate({
          where: { place },
          defaults: {
            place,
          },
        });
        const [view] = await View.findOrCreate({
          where: { titleView },
          defaults: {
            titleView,
          },
        });
        const cityId = city.id;
        const placeId = placeName.id;
        const viewId = view.id;

        (fountain.title = title),
          (fountain.description = description),
          (fountain.techDescription = techDescription),
          (fountain.coordinateX = coordinateX),
          (fountain.coordinateY = coordinateY),
          (fountain.cityId = cityId),
          (fountain.placeId = placeId),
          (fountain.viewId = viewId),
          fountain.save();

          if (req.files && req.files.length > 0) {
            const compPhoto = await PhotoFountain.findAll({
              where: { fountImageId: id },
            });
            const plainPhoto = compPhoto.map((el) => el.get({ plain: true }));
            const comparisonPhoto = plainPhoto.map((el) => {
              return { id: el.id, image: el.image };
            });
        
            comparisonPhoto.forEach(async (el) => {
              const photo = await PhotoFountain.findOne({
                where: { id: el.id, fountImageId: id },
              });
              photo.destroy();
            });
    
            req.files.forEach(async (file) => {
              const newPhoto = await PhotoFountain.findOrCreate({
                where: {
                  image: `http://localhost:3200/img/${file.filename}`,
                  fountImageId: id,
                },
                defaults: {
                  image: `http://localhost:3200/img/${file.filename}`,
                  fountImageId: id,
                },
              });
              console.log(`Image filename: ${file.filename}`);
            });
          }
        

        const compType = await Fountain.findByPk(id, {
          include: {
            model: Type,
            as: 'types',
            attributes: ['id', 'nameType'],
          },
        });
        const comparisonType = compType.types.map((el) => {
          return { id: el.id, nameType: el.nameType };
        });

        const arrType = nameType.split(', ');
        const arr = [];
        comparisonType.forEach((el) => {
          if (!arrType.includes(el.nameType)) {
            arr.push(el);
          }
        });

        arr.forEach(async (el) => {
          const type = await AllType.findOne({
            where: { typeId: el.id, fountainId: id },
          });
          type.destroy();
        });

        arrType.forEach(async (el) => {
          const [type] = await Type.findOrCreate({
            where: { nameType: el },
            defaults: {
              nameType: el,
            },
          });
          const typeId = type.id;
          const newType = await AllType.findOrCreate({
            where: { typeId, fountainId: fountain.id },
            defaults: {
              typeId,
              fountainId: fountain.id,
            },
          });
        });

        res.status(200).json({ fountain });
      } else {
        res.status(400).json({ message: 'Запись отсутствует' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
