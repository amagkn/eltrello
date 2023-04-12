import { UserDocument } from '../user.interface';
import { Socket } from 'socket.io';

export interface SocketWithPayload extends Socket {
  user?: UserDocument;
}
