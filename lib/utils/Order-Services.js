
import Order from '../models/Order.js';
import { sendSms } from './twilio.js';

export default class OrderService {

  static async create(order) {
    const thatOrder = await Order.insert(order);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Thank you for your purchase!
      New Order received for ${order.item}.`
    );

    return thatOrder;
  }
}
