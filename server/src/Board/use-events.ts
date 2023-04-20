import { MainSocketEvents } from '../app/types/main-socket-events';
import { joinBoard } from './event-handlers/joinBoard';
import { leaveBoard } from './event-handlers/leaveBoard';
import { Server, Socket } from 'socket.io';
import { updateBoard } from './event-handlers/updateBoard';
import { deleteBoard } from './event-handlers/deleteBoard';

export const useBoardEvents = (io: Server, socket: Socket) => {
  socket.on(MainSocketEvents.boardsJoin, (data) => {
    joinBoard(io, socket, data);
  });

  socket.on(MainSocketEvents.boardsLeave, (data) => {
    leaveBoard(io, socket, data);
  });

  socket.on(MainSocketEvents.boardsUpdate, (data) => {
    updateBoard(io, socket, data);
  });

  socket.on(MainSocketEvents.boardsDelete, (data) => {
    deleteBoard(io, socket, data);
  });
};
