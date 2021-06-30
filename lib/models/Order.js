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
  }

  // static method
  // instance method
  static async insert({ item, quantity }) {
    console.log('insert', item, quantity);
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

    return new Order(rows);
  }

  static async readId(id) {
    const data = await pool.query(`
        SELECT id, quantity
        FROM orders
        WHERE id = $1;
      `, [id]
    );

    return new Order(data.rows[0]);
  }

  static async update(id, quantity) {
    const data = await pool.query(`
        UPDATE orders
        SET quantity = $1
        WHERE id = $2
        RETURNING id, quantity;
      `, [quantity, id]
    );

    return new Order(data.rows[0]);
  }

  static async delete() {
    const data = await pool.query(`
    DELETE FROM orders
    WHERE id = $1
    RETURNING *`, [


    ]

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
