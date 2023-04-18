import { RequestHandlerWithPayload } from '../../app/types/http/request-handler-with-payload';
import { TaskModel } from '../models/task';

export const getTasks: RequestHandlerWithPayload = async (req, res, next) => {
  try {
    if (!req.user) return res.sendStatus(401);

    if (!req.query.boardId) {
      return res.status(400).json({ errors: ['boardId required'] });
    }

    const tasks = await TaskModel.find({
      boardId: req.query.boardId,
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};
