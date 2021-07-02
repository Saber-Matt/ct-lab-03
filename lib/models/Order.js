import pool from '../utils/pools.js';


// 1. define the shape of our data
// 2. define methods to access that data (CRUD)
export default class Order {
  id;
  item;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
    this.item = row.item;
  }

  // static method
  // instance method
  static async insert({ item, quantity }) {
    const { rows } = await pool.query(`
        INSERT INTO orders (item, quantity) 
        VALUES ($1, $2) 
        RETURNING *
`, [item, quantity]
    );
    return new Order(rows[0]);
  }

  static async readAll() {
    const { rows } = await pool.query(`
  SELECT * FROM orders`);

    return rows.map((row) => new Order(row));
  }

  static async readId(id) {
    console.log(id);
    const { rows } = await pool.query(`
        SELECT *
        FROM orders
        WHERE id = $1
      `, [id]
    );
    console.log('this is how I like my milkshake', rows);
    return new Order(rows[0]);
  }

  static async update(id, order) {
    const data = await pool.query(`
        UPDATE orders
        SET item = $1,
        quantity = $2
        WHERE id = $3
        RETURNING *
      `, [order.item, order.quantity, id]
    );
    console.log(data);
    return new Order(data.rows[0]);
  }

  static async delete(id) {
    const data = await pool.query(`
    DELETE FROM orders
    WHERE id = $1
    RETURNING *`, [id]

    );

    return new Order(data.rows[0]);
  }

  //   static async deleteAllRows() {
  //     const data = await pool.query(`
  //     DELETE * FROM ORDERS
  //     `);
  //     return new Order(data.rows);
  //   }

  // }

  // module.exports = Order;
}
