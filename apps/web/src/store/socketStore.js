import create from 'zustand';

const useSocketStore = create((set) => ({
  socket: null,
  connected: false,
  messages: [],
  
  setSocket: (socket) => set({ socket }),
  setConnected: (status) => set({ connected: status }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));

export default useSocketStore;