import axios from 'axios'
import { create } from 'zustand'

interface NotificationState {
  count: number;
  fetch: () => void;
  dec: () => void;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  count: 0,
  fetch: async () => {
    const res = await axios.get('api/user/notification');
    set({ count: res.data.value });
  },
  dec: () => set((state: { count: number, fetch: () => void }) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}))