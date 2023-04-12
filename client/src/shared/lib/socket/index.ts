import { io, Socket as SocketLib } from 'socket.io-client';

export class Socket {
  private socket: SocketLib | null = null;

  setup(url: string, auth: { [key: string]: any }): void {
    this.socket = io(url, {
      auth,
    });
  }

  disconnect(): void {
    if (!this.socket) {
      throw new Error('Socket connection is not established');
    }
    this.socket.disconnect();
    this.socket = null;
  }

  emit(eventName: string, message: any): void {
    if (!this.socket) {
      throw new Error('Socket connection is not established');
    }

    this.socket.emit(eventName, message);
  }
}
