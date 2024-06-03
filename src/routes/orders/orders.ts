import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../../models/order';
import verifyAuthToken from '../../middleware/authMiddleware';

const store = new OrderStore();

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    id: _req.body.id,
    user_id: _req.body.user_id,
    order_status: _req.body.order_status
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: number = _req.body.product_id;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const completedOrders = async (_req: Request, res: Response) => {
  try {
    const pastOrders = await store.completedOrders(_req.params.user_id);
    res.json(pastOrders);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const order = await store.currentOrderByUser(req.params.user_id);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const orderRoutes = (app: express.Router) => {
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders/current/:user_id', verifyAuthToken, currentOrderByUser);
  app.get('/orders/completed/:user_id', verifyAuthToken, completedOrders);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default orderRoutes;
