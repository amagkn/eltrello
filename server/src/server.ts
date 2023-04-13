import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import * as usersController from './controllers/users';
import * as boardController from './controllers/boards';
import * as columnController from './controllers/columns';

import { authMiddleware, authSocketMiddleware } from './middlewares/auth';
import { MONGO_URL, SERVER_PORT } from './config';
import { MainSocketEvents } from './types/main-socket-events';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set('toJSON', {
  virtuals: true,
  transform: (_, converter) => {
    delete converter._id;
  },
});

app.post('/api/users', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/user', authMiddleware, usersController.currentUser);
app.get('/api/boards', authMiddleware, boardController.getBoards);
app.post('/api/boards', authMiddleware, boardController.createBoard);
app.get('/api/boards/:boardId', authMiddleware, boardController.getBoard);
app.get(
  '/api/boards/:boardId/columns',
  authMiddleware,
  columnController.getColumns
);

io.use(authSocketMiddleware).on('connection', (socket) => {
  socket.on(MainSocketEvents.boardsJoin, (data) => {
    boardController.joinBoard(io, socket, data);
  });

  socket.on(MainSocketEvents.boardsLeave, (data) => {
    boardController.leaveBoard(io, socket, data);
  });
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');

    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server is started on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
  });
