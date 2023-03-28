import { create } from 'zustand';
import { CurrentUser } from 'entities/auth/types/current-user';
import { devtools } from 'zustand/middleware';

type State = {
  currentUser: CurrentUser | null;
  isLoggedIn: boolean;
};

type Actions = {
  setCurrentUser(currentUser: CurrentUser): void;
};

export const useAuthStore = create<State & Actions>()(
  devtools(
    (set) => ({
      currentUser: null,
      isLoggedIn: false,
      setCurrentUser: (currentUser: CurrentUser) =>
        set(() => ({ currentUser, isLoggedIn: Boolean(currentUser) })),
    }),
    { name: 'auth-store' }
  )
);
