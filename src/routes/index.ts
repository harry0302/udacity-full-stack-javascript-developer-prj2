import { Router, Request, Response } from 'express';
import productRoutes from './products/products';
import userRoutes from './users/users';
import orderRoutes from './orders/orders';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello world!' });
});

productRoutes(router);
userRoutes(router);
orderRoutes(router);

router.use((_req: Request, res: Response) =>
  res.status(404).send('404 Not Found')
);

export default router;
