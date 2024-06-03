import supertest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import { User } from '../../models/user';

dotenv.config();

const request = supertest(app);

describe('User Handler', () => {
  let user: User;
  let token: string;

  beforeAll(async () => {
    const res = await request.post('/users').send({
      first_name: 'Test',
      last_name: 'User',
      password: 'password123'
    });
    user = res.body.user;
    token = res.body.token;
  });

  it('should create a new user and return a token', async () => {
    const user = {
      first_name: 'New',
      last_name: 'User',
      password: 'password123'
    };
    const res = await request.post('/users').send(user);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  it('should get all users', async () => {
    const res = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a single user', async () => {
    const res = await request
      .get(`/users/${user.id!}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id == user.id!).toBeTrue();
  });
});
