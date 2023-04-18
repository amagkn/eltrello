import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';

export const joinBoard: SocketEventHandler<{ boardId: string }> = (
  io,
  socket,
  data
) => {
  console.log('server socket io join', data.boardId, socket.user);
  socket.join(data.boardId);
};
