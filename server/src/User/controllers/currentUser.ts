import { RequestHandlerWithPayload } from '../../types/http/request-handler-with-payload';
import { normalizeUser } from '../helpers';

export const currentUser: RequestHandlerWithPayload = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    res.json(normalizeUser(req.user));
  } catch (err) {
    next(err);
  }
};
