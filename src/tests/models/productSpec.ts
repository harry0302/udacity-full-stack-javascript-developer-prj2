import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  let product2: Product;

  beforeAll(async () => {
    product2 = await store.create({
      name: 'product2',
      price: 100,
      category: 'product2'
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

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Test Product',
      price: 1,
      category: 'Test Category'
    });
    expect(result.name).toEqual('Test Product');
    expect(result.price == 1).toBeTrue();
    expect(result.category).toEqual('Test Category');
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(product2.id!.toString());
    expect(result.id).toEqual(product2.id!);
    expect(result.name).toEqual(product2.name);
    expect(result.price).toBe(product2.price);
    expect(result.category).toEqual(product2.category);
  });
});
