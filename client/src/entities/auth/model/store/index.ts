import { create } from 'zustand';
import { CurrentUser } from 'entities/auth/types/current-user';

export const useAuthStore = create<{
  currentUser: CurrentUser | null;
  setCurrentUser(currentUser: CurrentUser): void;
}>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser: CurrentUser) => set(() => ({ currentUser })),
}));
