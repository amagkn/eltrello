import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { UserModel } from '../models/user';
import { RequestHandlerWithPayload } from '../types/http/request-handler-with-payload';
import { TokenPayload } from '../types/token-payload';
import { SocketWithPayload } from '../types/socket/socket-with-payload';

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
    const data = jwt.verify(token, SECRET) as TokenPayload;

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

export const authSocketMiddleware = async (
  socket: SocketWithPayload,
  next: (err?: any) => void
) => {
  try {
    const authHeader = (socket.handshake.auth.token as string) ?? '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      return next(new Error('Authentication error'));
    }

    const data = jwt.verify(token, SECRET) as TokenPayload;

    const user = await UserModel.findById(data.id);

    if (!user) {
      return next(new Error('Authentication error'));
    }

    socket.user = user;

    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
};
