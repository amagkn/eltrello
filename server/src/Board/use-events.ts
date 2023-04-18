import { MainSocketEvents } from '../app/types/main-socket-events';
import { joinBoard } from './event-handlers/joinBoard';
import { leaveBoard } from './event-handlers/leaveBoard';
import { Server, Socket } from 'socket.io';

export const useBoardEvents = (io: Server, socket: Socket) => {
  socket.on(MainSocketEvents.boardsJoin, (data) => {
    joinBoard(io, socket, data);
  });

  socket.on(MainSocketEvents.boardsLeave, (data) => {
    leaveBoard(io, socket, data);
  });
};
