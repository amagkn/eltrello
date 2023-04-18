import express from 'express';
import { authMiddleware } from '../app/middlewares/auth';
import { getTasks } from './controllers/getTasks';

export const TaskRouter = express.Router();

TaskRouter.use(authMiddleware);

TaskRouter.get('/all', getTasks);
