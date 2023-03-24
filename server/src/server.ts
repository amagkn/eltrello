import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import * as usersController from './controllers/users';
import { authMiddleware } from './middlewares/auth';
import { MONGO_URL, SERVER_PORT } from './config';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/users', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/user', authMiddleware, usersController.currentUser);

io.on('connection', () => {
  console.log('Socket.io is running');
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
