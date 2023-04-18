import { RequestHandlerWithPayload } from '../../app/types/http/request-handler-with-payload';
import { ColumnModel } from '../models/column';

export const getColumns: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    if (!req.query.boardId) {
      return res.status(400).json({ errors: ['boardId required'] });
    }

    const columns = await ColumnModel.find({
      boardId: req.query.boardId,
    });

    res.json(columns);
  } catch (err) {
    next(err);
  }
};
