import { httpGet, httpPost } from '../../../shared/lib/http';
import { environment } from '../../../shared/config/environment';
import { Board } from '../types/board';
import { mainSocket } from '../../../features/main-socket/main-socket';

export const getBoards = async (): Promise<Board[] | null> =>
  httpGet(environment.REACT_APP_API_URL + '/board/all');

export const getBoard = async (boardId: string): Promise<Board | null> =>
  httpGet(environment.REACT_APP_API_URL + `/board?boardId=${boardId}`);

export const createBoard = async (title: string): Promise<Board | null> =>
  httpPost(environment.REACT_APP_API_URL + '/board', {
    body: JSON.stringify({ title }),
    headers: { 'Content-Type': 'application/json' },
  });

export const updateBoard = async (payload: {
  boardId: string;
  fields: { title: string };
}) => mainSocket.emitUpdateBoard(payload);

export const deleteBoard = async (payload: { boardId: string }) =>
  mainSocket.emitDeleteBoard(payload);
