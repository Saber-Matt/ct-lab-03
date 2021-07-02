/* eslint-disable keyword-spacing */
import { Router } from 'express';
import Order from '../models/Order.js';
import OrderService from '../utils/Order-Services.js';

// export default Router.......
export default Router() // app.post(....)
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);

    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res) => {
    //     console.log(`My name is ${this.name}`);
    try {
      //   }
      const order = await Order.readId(req.params.id);
      // }
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .get('/', async (req, res) => {
    try {
      const order = await Order.readAll();
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const order = await Order.update(req.params.id, req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const order = await Order.delete(req.params.id);
      res.send(order);

    } catch (err) {
      next(err);
    }
  });
