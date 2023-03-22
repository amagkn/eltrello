import { Document } from "mongoose";

export interface User {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface UserDocument extends User, Document {
  // todo: Возможно нужно сменить рещзультат функции на string
  validatePassword(param1: string): Promise<boolean>;
}
