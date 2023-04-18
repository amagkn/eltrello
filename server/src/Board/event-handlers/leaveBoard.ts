import { SocketEventHandler } from '../../app/types/socket/socket-event-handler';

export const leaveBoard: SocketEventHandler<{ boardId: string }> = (
  io,
  socket,
  data
) => {
  console.log('server socket io leave', data.boardId, socket.user);
  socket.leave(data.boardId);
};
