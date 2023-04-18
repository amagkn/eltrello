import express from 'express';
import { authMiddleware } from '../app/middlewares/auth';
import { getBoard } from './controllers/getBoard';
import { getBoards } from './controllers/getBoards';
import { createBoard } from './controllers/createBoard';

export const BoardRouter = express.Router();

BoardRouter.use(authMiddleware);

BoardRouter.get('/all', getBoards);
BoardRouter.post('/', createBoard);
BoardRouter.get('/', getBoard);
