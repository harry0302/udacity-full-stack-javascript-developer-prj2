import express, { Request, Response } from 'express';
import { UserStore, User } from '../../models/user';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../../middleware/authMiddleware';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name
    });
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };
    const newUser = await store.create(user);
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.JWT_SECRET as string
    );
    res.json({
      user: {
        id: newUser.id,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      },
      token: token
    });
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
};

const userRoutes = (app: express.Router) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
};

export default userRoutes;
