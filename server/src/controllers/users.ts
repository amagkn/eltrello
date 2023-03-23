import { RequestHandler } from "express";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";

import { secret } from "../config";
import { UserModel } from "../models/user";
import { UserDocument } from "../types/user.interface";
import { RequestHandlerWithPayload } from "../types/request-handler-with-payload";

const errorsMessages = {
  emailOrPassword: "Incorrect email or password",
  userIsExist: "The user with this email exists",
};

const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign({ id: user.id, email: user.email }, secret);

  return {
    email: user.email,
    username: user.username,
    id: user.id,
    token,
  };
};

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
      return res.status(422).json({ userIsExist: errorsMessages.userIsExist });
    }

    const savedUser = await newUser.save();

    res.status(201).send(normalizeUser(savedUser));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);

      return res.status(422).json(messages);
    }

    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    }).select("+password");

    if (!user) {
      return res
        .status(422)
        .json({ emailOrPassword: errorsMessages.emailOrPassword });
    }

    const isValidPassword = await user.validatePassword(req.body.password);

    if (!isValidPassword) {
      return res
        .status(422)
        .json({ emailOrPassword: errorsMessages.emailOrPassword });
    }

    res.json(normalizeUser(user));
  } catch (err) {
    next(err);
  }
};

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
