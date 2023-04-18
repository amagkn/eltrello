import { Server, Socket } from 'socket.io';
import { MainSocketEvents } from '../app/types/main-socket-events';
import { createTask } from './event-handlers/createTask';

export const useTaskEvents = (io: Server, socket: Socket) => {
  socket.on(MainSocketEvents.tasksCreate, (data) => {
    createTask(io, socket, data);
  });
};
