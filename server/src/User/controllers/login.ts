import { RequestHandler } from 'express';
import { UserModel } from '../../models/user';
import { errorsMessages, normalizeUser } from '../helpers';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    }).select('+password');

    if (!user) {
      return res.status(422).json({ errors: [errorsMessages.emailOrPassword] });
    }

    const isValidPassword = await user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res.status(422).json({ errors: [errorsMessages.emailOrPassword] });
    }

    res.json(normalizeUser(user));
  } catch (err) {
    next(err);
  }
};
