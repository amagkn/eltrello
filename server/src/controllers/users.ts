import { RequestHandler } from "express";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";

import { secret } from "../config";
import UserModel from "../models/user";
import { UserDocument } from "../types/user.interface";

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
