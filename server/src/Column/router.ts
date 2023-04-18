import express from 'express';
import { authMiddleware } from '../app/middlewares/auth';
import { getColumns } from './controllers/getColumns';

export const ColumnRouter = express.Router();

ColumnRouter.use(authMiddleware);

ColumnRouter.get('/all', getColumns);
