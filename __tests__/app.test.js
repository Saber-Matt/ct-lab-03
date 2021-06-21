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

    it('finds order in database', async() => {
      const order = await Order.insert({
        item: 'tupperware',
        quantity: 3
      });
  
      const res = await request(app)
        .get(`/api/v1/orders/${order.id}`);
  
      expect(res.body).toEqual(order);
    });
  });