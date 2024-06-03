import { Order, OrderStore } from '../../models/order';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order Model', () => {
  let user1: User;
  let product1: Product;
  let order1: Order;
  beforeAll(async () => {
    user1 = await userStore.create({
      first_name: 'user1',
      last_name: 'user1',
      password: 'user1'
    });
    product1 = await productStore.create({
      name: 'product1',
      price: 100,
      category: 'product1'
    });
    order1 = await orderStore.create({
      user_id: user1.id!,
      order_status: 'active'
    });
  });

  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a addProduct method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });

  it('should have a completedOrders method', () => {
    expect(orderStore.completedOrders).toBeDefined();
  });

  it('should have a currentOrderByUser method', () => {
    expect(orderStore.currentOrderByUser).toBeDefined();
  });

  it('create method should return created order', async () => {
    const ord: Order = await orderStore.create({
      user_id: user1.id!,
      order_status: 'active'
    });
    expect(ord.user_id).toEqual(user1.id!);
    expect(ord.order_status).toEqual('active');
  });

  it('addProduct method should add row to orders_products table', async () => {
    const result = await orderStore.addProduct(
      1,
      order1.id!.toString(),
      product1.id!
    );
    expect(result.order_id).toEqual(order1.id!);
    expect(result.quantity == 1).toBeTrue();
    expect(result.product_id).toEqual(product1.id!);
  });

  it('currentOrderByUser method should return the correct order', async () => {
    const result = await orderStore.currentOrderByUser(user1.id!.toString());
    expect(result.length).toBe(2);
  });

  it('completedOrders method should return list of current orders', async () => {
    const result = await orderStore.completedOrders(user1.id!.toString());
    expect(result).toEqual([]);
  });
});
