import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import { User } from '../../models/user';
import { Product } from '../../models/product';

dotenv.config();

const request = supertest(app);

describe('Order Handler', () => {
  let user: User;
  let product: Product;
  let token: string;

  beforeAll(async () => {
    const resUser = await request.post('/users').send({
      first_name: 'Test',
      last_name: 'User',
      password: 'password123'
    });
    user = resUser.body.user;
    token = resUser.body.token;

    const resProduct = await request
      .post('/products')
      .send({
        name: 'Test Product',
        price: 100,
        category: 'Test Category'
      })
      .set('Authorization', `Bearer ${token}`);
    product = resProduct.body;
  });

  it('should create a new order', async () => {
    const res = await request
      .post('/orders')
      .send({
        user_id: user.id!,
        order_status: 'active'
      })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('should add product to order', async () => {
    const res = await request
      .post('/orders/1/products')
      .send({
        product_id: product.id,
        quantity: 20
      })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('should get the current order for a user', async () => {
    const res = await request
      .get('/orders/current/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get the completed order for a user', async () => {
    const res = await request
      .get('/orders/completed/1')
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });
});
