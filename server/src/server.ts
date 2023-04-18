import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

import { authSocketMiddleware } from './app/middlewares/auth';
import { MONGO_URL, SERVER_PORT } from './app/config';
import { UserRouter } from './User/router';
import { BoardRouter } from './Board/router';
import { useBoardEvents } from './Board/use-events';
import { useColumnEvents } from './Column/use-events';
import { ColumnRouter } from './Column/router';
import { useTaskEvents } from './Task/use-events';
import { TaskRouter } from './Task/router';

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

app.use('/api/user', UserRouter);
app.use('/api/board', BoardRouter);
app.use('/api/column', ColumnRouter);
app.use('/api/task', TaskRouter);

io.use(authSocketMiddleware).on('connection', (socket) => {
  useBoardEvents(io, socket);
  useColumnEvents(io, socket);
  useTaskEvents(io, socket);
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
