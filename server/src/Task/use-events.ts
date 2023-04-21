import { Server, Socket } from 'socket.io';
import { MainSocketEvents } from '../app/types/main-socket-events';
import { createTask } from './event-handlers/createTask';
import { updateTask } from './event-handlers/updateTask';
import { deleteTask } from './event-handlers/deleteTask';

export const useTaskEvents = (io: Server, socket: Socket) => {
  socket.on(MainSocketEvents.tasksCreate, (data) => {
    createTask(io, socket, data);
  });

  socket.on(MainSocketEvents.tasksDelete, (data) => {
    deleteTask(io, socket, data);
  });

  socket.on(MainSocketEvents.tasksUpdate, (data) => {
    updateTask(io, socket, data);
  });
};
