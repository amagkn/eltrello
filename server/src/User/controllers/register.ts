import { RequestHandler } from 'express';
import { UserModel } from '../models/user';
import { Error } from 'mongoose';
import { errorsMessages, normalizeUser } from '../helpers';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const newUser = new UserModel({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });

    const userExist = await UserModel.findOne({
      email: req.body.email,
    });

    if (userExist) {
      return res.status(422).json({ errors: [errorsMessages.userIsExist] });
    }

    const savedUser = await newUser.save();

    res.status(201).send(normalizeUser(savedUser));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);

      return res.status(422).json({ errors: messages });
    }

    next(err);
  }
};
