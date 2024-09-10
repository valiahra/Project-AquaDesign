const router = require('express').Router();
const { Order, PhotoFountain } = require('../../db/models');
// const { verifyAccessToken } = require("../middlewares/verifyToken");
const upload = require('../middlewares/multer')

router
.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(orders.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
.get("/on", async (req, res) => {
  try {
    const orders = await Order.findAll({  
      where: {
        status:'принят',
      },
  });
    res.json(orders.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
.get("/work", async (req, res) => {
  try {
    const orders = await Order.findAll({  
      where: {
        status:'в работе',
      },
  });
    res.json(orders.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
.get("/off", async (req, res) => {
  try {
    const orders = await Order.findAll({  
      where: {
        status:'завершен',
      },
  });
    res.json(orders.sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})
.get("/:userId/userOrders", async (req, res) => {
  try {
    
    const { userId } = req.params;
    console.log(userId)
    const orders = await Order.findAll({
      where: { userId },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
})

.post("/createOrder", upload.array('images'), async (req, res) => {
  const userId = req.body.user;
  const { firstName, lastName, phone, email, city, typeFountain, comment, budget, square } = req.body;
  if (!userId) {
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
  try {
    const order = await Order.create({
      firstName, 
      lastName, 
      email,
      phone, city, 
      typeFountain, 
      comment, 
      budget,
      square,
      userId: userId,
      status: 'принят',
    });
    if (req.files) {
      const images = req.files.map((file) => `http://localhost:3200/img/${file.filename}`);
     await Order.update({ photo: images.join(',') }, { where: { id: order.id } });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Ошибка при создании заказа', error: error.message });
  }
})
  .put("/:id/changeStatusOfOrder", async (req, res) => {
    const {id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (order) {
        if(order.status === 'принят'){
          order.status = 'в работе';
        }else if(order.status === 'в работе'){
           order.status = 'завершен'
        }else if(order.status === 'завершен'){
          order.status = 'принят'
        }
        order.save()
        res.status(200).json(order);
      } else {
        res.status(400).send("Not found");
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findOne({ where: { id } });
      order.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .delete("/:id/userOrder", async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findOne({ where: { id } });
      if(order.status === 'принят'){
        order.destroy();
        res.sendStatus(200);
      } else {
        res.status(400).json({ message: 'Заказ нельзя удалить' });
      }
      // order.destroy();
      // res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .put("/:id/editUserOrder", upload.array('images'), async (req, res) => {
    const { id } = req.params;
    const { 
      firstName, 
      lastName, 
      phone, 
      city,
      email, 
      typeFountain, 
      comment, 
      budget,
      square,
      userId,
      status 
    } = req.body;
  
    try {
      console.log(`Ручка editUserOrder вызвана с id ${id}`);
      const order = await Order.findByPk(Number(id));
      console.log(`Заказ с id ${id} найден`);
  
      if (order.status === 'принят') {
        console.log(`Заказ с id ${id} имеет статус "принят"`);
        order.firstName = firstName;
        order.lastName = lastName;
        order.phone = phone;
        order.email = email;
        order.city = city;
        order.typeFountain = typeFountain;
        order.comment = comment;
        order.budget = budget;
        order.square = square;
        order.userId = userId;
        order.status = status;
        console.log(`Данные заказа с id ${id} обновлены`);
  
        if (req.files) {
          console.log(`Файлы изображений присутствуют в запросе`);
          const images = req.files.map((file) => `http://localhost:3200/img/${file.filename}?${Date.now()}`);
          console.log(`Изображения преобразованы в массив`);
        
          await Order.update({ photo: images.join(',') }, { where: { id: id } });
          order.photo = images.join(',');
          console.log(`Фото заказа с id ${id} обновлено`);
        }
  
        await order.save();
        console.log(`Данные заказа с id ${id} сохранены`);
        res.status(200).json(order);
      } else {
        console.log(`Заказ с id ${id} не имеет статус "принят"`);
        res.status(400).send("Not found");
      }
    } catch (error) {
      console.error(`Ошибка при обработке запроса editUserOrder: ${error}`);
      res.sendStatus(400);
    }
  });

module.exports = router;