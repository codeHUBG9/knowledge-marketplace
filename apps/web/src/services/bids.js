import api from './api';

const BidsService = {
    createBid: async (bidData) => {
        try {
            const response = await api.post('/bids', bidData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getBidsByQuestionId: async (questionId) => {
        try {
            const response = await api.get(`/bids?questionId=${questionId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getBidById: async (bidId) => {
        try {
            const response = await api.get(`/bids/${bidId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    updateBid: async (bidId, bidData) => {
        try {
            const response = await api.put(`/bids/${bidId}`, bidData);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    deleteBid: async (bidId) => {
        try {
            const response = await api.delete(`/bids/${bidId}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default BidsService;