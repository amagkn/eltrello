import { Server } from 'socket.io';
import { SocketWithPayload } from './socket-with-payload';

export type socketEventHandler<T> = (
  io: Server,
  socket: SocketWithPayload,
  data: T
) => void;
