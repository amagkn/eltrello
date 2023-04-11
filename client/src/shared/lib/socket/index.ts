import { io, Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export const setupSocket = (url: string, auth: { [key: string]: any }) => {
  socket = io(url, {
    auth,
  });
};

export const disconnectSocket = () => {
  if (!socket) {
    throw new Error('Socket connection is not established');
  }
  socket.disconnect();
  socket = null;
};
