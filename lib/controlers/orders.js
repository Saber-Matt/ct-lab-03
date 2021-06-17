/* eslint-disable keyword-spacing */
const { Router } = require('express');
const { read } = require('fs/promises');
const Order = require('../models/Order');

// export default Router.......
module.exports = Router() // app.post(....)
  .post('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.insert(req.params.quantity);
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .get('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.read();
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
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


  // // const spot = {
  .put('/api/v1/orders/:id', async (req, res) => {
    // //   name: 'spot',
    try {
      // //   age: 5,
      const order = await Order.update(req.params.id, req.params.quantity);
      // //   weight: '20 lbs',
      res.send(order);
      // // };
    } catch (err) {
      // const spot = new Dog('spot', 5, '20 lbs');
      res.status(500).send(err);
      // spot.sayName();
    }
  })

  .delete('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.delete(req.params.id, req.params.id);
      res.send(order);
    }
    catch (err) {
      res.status(500).send(err);
    }
  });

  .delete ('api/v1/orders', async (req, res) => {
  try {
    const orders = await Order.deleteAll()
    res.send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});