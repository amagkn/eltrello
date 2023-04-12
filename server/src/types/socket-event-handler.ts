import { Server, Socket } from 'socket.io';

export type socketEventHandler<T> = (
  io: Server,
  socket: Socket,
  data: T
) => void;
