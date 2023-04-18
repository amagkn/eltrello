import express from 'express';
import { login } from './controllers/login';
import { authMiddleware } from '../app/middlewares/auth';
import { currentUser } from './controllers/currentUser';
import { register } from './controllers/register';

export const UserRouter = express.Router();

UserRouter.get('/', authMiddleware, currentUser);
UserRouter.post('/', register);
UserRouter.post('/login', login);
