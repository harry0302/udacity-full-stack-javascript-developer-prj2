import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import { User } from '../../models/user';
import { Product } from '../../models/product';

dotenv.config();

const request = supertest(app);

describe('Product Handler', () => {
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

  it('should create a new product', async () => {
    const res = await request
      .post('/products')
      .send({
        name: 'Test Product',
        price: 100,
        category: 'Test Category'
      })
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test Product');
    expect(res.body.price == 100).toBeTrue();
  });

  it('should get all products', async () => {
    const res = await request.get('/products');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a single product', async () => {
    const res = await request.get(`/products/${product.id!}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(product.id!);
  });
});
