import { create } from 'zustand';

// Shared state for common usage across all micro-frontends
export const useSharedStore = create((set) => ({
  user: null,
  theme: 'light',
  notifications: [],
  setUser: (user) => set({ user }),
  setTheme: (theme) => set({ theme }),
  addNotification: (notification) => set((state) => ({ notifications: [...state.notifications, notification] })),
  clearNotifications: () => set({ notifications: [] })
}));
