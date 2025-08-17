import api from './api';

const walletService = {
    fetchWalletData: async () => {
        try {
            const response = await api.get('/wallet/data');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching wallet data');
        }
    },

    getBalance: async (userId) => {
        try {
            const response = await api.get(`/wallet/balance/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching balance');
        }
    },

    topUp: async (userId, amount) => {
        try {
            const response = await api.post(`/wallet/topup`, { userId, amount });
            return response.data;
        } catch (error) {
            throw new Error('Error topping up wallet');
        }
    },

    getTransactionHistory: async (userId) => {
        try {
            const response = await api.get(`/wallet/transactions/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching transaction history');
        }
    }
};

export default walletService;