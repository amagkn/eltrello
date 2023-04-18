import { Server, Socket } from 'socket.io';
import { MainSocketEvents } from '../app/types/main-socket-events';
import { createColumn } from './event-handlers/createColumn';

export const useColumnEvents = (io: Server, socket: Socket) => {
  socket.on(MainSocketEvents.columnsCreate, (data) => {
    createColumn(io, socket, data);
  });
};
