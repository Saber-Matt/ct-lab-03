import pool from '../lib/utils/pools.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

// jest.mock('twilio', () => () => ({
//   messages: {
//     create: jest.fn(),
//   },
// }));

describe('07 demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.only('creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({
        item: 'infinity stone',
        quantity: 1
      });
    expect(res.body).toEqual({
      id: '1',
      item: 'infinity stone',
      quantity: 1
    });
  });

  it('finds order in database by Id', async () => {
    const order = await Order.insert({
      item: 'tupperware',
      quantity: 3
    });

    const res = await request(app)
      .get(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
  });

  it('Deletes an order by id via', async () => {
    const order = await Order.insert({
      quantity: 10
    });

    const res = await request(app).delete(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
  });

  it('gets all orders', async () => {
    const order1 = await Order.insert({
      item: 'bear',
      quantity: 7
    });

    const order2 = await Order.insert({
      item: 'porage',
      quantity: 2
    });

    const order3 = await Order.insert({
      item: 'trousers',
      quantity: 14
    });
    console.log('hello, Mr Bond', order1);

    const res = await request(app).get('/api/v1/orders');
    console.log('res.body', res.body);
    expect(res.body).toEqual([order1, order2, order3]);
  });

  it('Updates an order', async () => {
    const order = await Order.insert({
      quantity: 4
    });

    order.quantity = 4;

    const res = await request(app).put(`/api/v1/orders/${order.id}`)
      .send(order);
    expect(res.body).toEqual(order);
  });


});
