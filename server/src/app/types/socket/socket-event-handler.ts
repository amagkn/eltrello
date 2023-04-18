import { Server } from 'socket.io';
import { SocketWithPayload } from './socket-with-payload';

export type SocketEventHandler<TData = any> = (
  io: Server,
  socket: SocketWithPayload,
  data: TData
) => void;
