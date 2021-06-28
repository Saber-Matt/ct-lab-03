/* eslint-disable keyword-spacing */
const { Router } = require('express');
const { read } = require('fs/promises');
const Order = require('../models/Order');

// export default Router.......
module.exports = Router() // app.post(....)
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);

    } catch (err) {
      next(err);
    }
  })
  .get('/api/v1/orders/:id', async (req, res) => {
    //     console.log(`My name is ${this.name}`);
    try {
      //   }
      const order = await Order.read(req.params.id);
      // }
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders/', async (req, res) => {
    try {
      const order = await Order.readAll();
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  .delete ('/:id', async (req, res, next) => {
  try {
    const order = await OrderService.delete(req.params.id);
    res.send(order);

  } catch (err) {
    next(err);
  }
});

  .put('/:id', async (req, res, next) => {
  try {
    const order = await OrderService.update(req.body, req.params.id);
    res.send(order);
  } catch (err) {
    next(err);
  }
})