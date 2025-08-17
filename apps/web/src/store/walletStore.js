import create from 'zustand';

const useWalletStore = create((set) => ({
  balance: 0,
  transactions: [],
  
  setBalance: (amount) => set((state) => ({ balance: amount })),
  
  addTransaction: (transaction) => set((state) => ({
    transactions: [...state.transactions, transaction],
  })),
  
  clearTransactions: () => set({ transactions: [] }),
}));

export default useWalletStore;