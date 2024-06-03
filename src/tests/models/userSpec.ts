import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
  let user2: User;

  beforeAll(async () => {
    user2 = await store.create({
      first_name: 'user2',
      last_name: 'user2',
      password: 'user2'
    });
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      first_name: 'John',
      last_name: 'Doe',
      password: 'password123'
    });
    expect(result.first_name).toEqual('John');
    expect(result.last_name).toEqual('Doe');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(user2.id!.toString());
    expect(result.first_name).toEqual('user2');
    expect(result.last_name).toEqual('user2');
  });
});
