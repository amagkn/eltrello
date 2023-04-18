import { RequestHandlerWithPayload } from '../../app/types/http/request-handler-with-payload';
import { BoardModel } from '../models/board';

export const getBoards: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const boards = await BoardModel.find({ userId: req.user.id });

    res.json(boards);
  } catch (err) {
    next(err);
  }
};
