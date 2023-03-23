import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserModel } from '../models/user';
import { RequestHandlerWithPayload } from '../types/request-handler-with-payload';

export const authMiddleware: RequestHandlerWithPayload = async (
  req,
  res,
  next
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    const data = jwt.verify(token, SECRET) as { id: string; email: string };

    const user = await UserModel.findById(data.id);

    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
