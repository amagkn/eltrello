import { removeToken } from '../model/local-storage';
import { useAuthStore } from '../model/store';
import { mainSocket } from '../../main-socket-connection/main-socket';

export const logout = () => {
  removeToken();
  mainSocket.disconnect();

  useAuthStore.getState().setCurrentUser(null);
};
