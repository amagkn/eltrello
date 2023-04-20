import { removeToken } from '../model/local-storage';
import { useAuthStore } from '../model/store';
import { mainSocket } from '../../../features/main-socket/main-socket';

export const logout = () => {
  removeToken();
  mainSocket.disconnect();

  useAuthStore.getState().setCurrentUser(null);
};
