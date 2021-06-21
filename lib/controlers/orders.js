/* eslint-disable keyword-spacing */
const { Router } = require('express');
const { read } = require('fs/promises');
const Order = require('../models/Order');

// export default Router.......
module.exports = Router() // app.post(....)
.post('/', async (req, res, next) => {
  try{
    const order = await OrderService.create(req.body);
    res.send(order);

  }catch(err) {
    next(err);
  }
});