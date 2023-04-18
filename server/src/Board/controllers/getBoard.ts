import { RequestHandlerWithPayload } from '../../app/types/http/request-handler-with-payload';
import { BoardModel } from '../models/board';

export const getBoard: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    if (!req.query.boardId) {
      return res.status(400).json({ errors: ['boardId required'] });
    }

    const board = await BoardModel.findById(req.query.boardId);

    if (!board) {
      return res
        .status(404)
        .json({ errors: [`Board ${req.query.boardId} not found`] });
    }

    return res.json(board);
  } catch (err) {
    next(err);
  }
};
