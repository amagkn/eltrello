import { Socket } from '../../shared/lib/socket';
import { environment } from '../../shared/config/environment';
import { CurrentUser } from '../auth/types/current-user';
import { MainSocketEvents } from './types/main-socket-events';
import { createAuthorizationHeader } from '../../shared/config/createAuthorizationHeader';
import { CreateColumnDto } from '../column/types/create-column-dto';
import { Column } from '../column/types/column';
import { ErrorData } from '../../shared/lib/http';

class MainSocket {
  constructor(private socket: Socket) {}

  setup(currentUser: CurrentUser): boolean {
    this.socket.setup(environment.REACT_APP_SOCKET_URL, {
      token: createAuthorizationHeader(currentUser.token),
    });

    return true;
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  emitJoinBoard(boardId: string): void {
    this.socket.emit(MainSocketEvents.boardsJoin, { boardId });
  }

  emitLeaveBoard(boardId: string): void {
    this.socket.emit(MainSocketEvents.boardsLeave, { boardId });
  }

  emitCreateColumn(columnDto: CreateColumnDto): void {
    this.socket.emit(MainSocketEvents.columnsCreate, columnDto);
  }

  listenCreateColumnSuccess(cb: (column: Column) => void): void {
    this.socket.listen(MainSocketEvents.columnsCreateSuccess, cb);
  }

  listenCreateColumnFailure(cb: (error: ErrorData) => void): void {
    this.socket.listen(MainSocketEvents.columnsCreateFailure, cb);
  }
}

export const mainSocket = new MainSocket(new Socket());
