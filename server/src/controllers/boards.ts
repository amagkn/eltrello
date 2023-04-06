import { RequestHandlerWithPayload } from '../types/request-handler-with-payload';
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

export const createBoard: RequestHandlerWithPayload = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) return res.sendStatus(401);

    const board = new BoardModel({
      title: req.body.title,
      userId: req.user.id,
    });

    const savedBoard = await board.save();

    res.json(savedBoard);
  } catch (err) {
    next(err);
  }
};
