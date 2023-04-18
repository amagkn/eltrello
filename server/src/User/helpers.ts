import { UserDocument } from '../app/types/user.interface';
import jwt from 'jsonwebtoken';
import { SECRET } from '../app/config';

export const errorsMessages = {
  emailOrPassword: 'Incorrect email or password',
  userIsExist: 'The user with this email exists',
};

export const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET);

  return {
    email: user.email,
    username: user.username,
    id: user.id,
    token,
  };
};
