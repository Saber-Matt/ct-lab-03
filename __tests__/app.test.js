const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order')

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('07 demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', async () => {
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
      quantity: 7
    });

    const order2 = await Order.insert({
      quantity: 2
    });

    const order3 = await Order.insert({
      quantity: 14
    });

    const res = await request(app).get('/api/v1/orders');
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