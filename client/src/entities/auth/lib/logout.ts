import { removeToken } from '../model/local-storage';
import { useAuthStore } from '../model/store';
import { disconnectSocket } from '../../../shared/lib/socket';

export const logout = () => {
  removeToken();
  disconnectSocket();

  useAuthStore.getState().setCurrentUser(null);
};
