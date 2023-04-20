import { Server, Socket } from 'socket.io';
import { MainSocketEvents } from '../app/types/main-socket-events';
import { createColumn } from './event-handlers/createColumn';
import { deleteColumn } from './event-handlers/deleteColumn';

export const useColumnEvents = (io: Server, socket: Socket) => {
  socket.on(MainSocketEvents.columnsCreate, (data) => {
    createColumn(io, socket, data);
  });

  socket.on(MainSocketEvents.columnsDelete, (data) => {
    deleteColumn(io, socket, data);
  });
};
