import pool from '../database';

export type Order = {
  id?: number;
  user_id: number;
  order_status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO orders (user_id, order_status) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.user_id, o.order_status]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create new order. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: number
  ): Promise<{
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
  }> {
    try {
      const conn = await pool.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      );
    }
  }

  async currentOrderByUser(user_id: string): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND order_status='active'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get current order for user ${user_id}. Error: ${err}`
      );
    }
  }

  async completedOrders(userId: string): Promise<Order[]> {
    try {
      const conn = await pool.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND order_status='completed'`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not find completed orders for user ${userId}. Error: ${err}`
      );
    }
  }
}
