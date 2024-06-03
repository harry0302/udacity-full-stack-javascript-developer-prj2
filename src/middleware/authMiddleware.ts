import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const payload = <JwtPayload>(
      jwt.verify(token, process.env.JWT_SECRET as string)
    );
    res.locals.jwtPayload = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Access denied, invalid token' });
  }
};

export default verifyAuthToken;
