import express, { Request, Response } from 'express';
import { ProductStore, Product } from '../../models/product';
import verifyAuthToken from '../../middleware/authMiddleware';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const productRoutes = (app: express.Router) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;
