import api from './api';

const BASE_URL = '/api/answers';

export const createAnswer = async (questionId, content) => {
    const response = await api.post(`${BASE_URL}`, { questionId, content });
    return response.data;
};

export const fetchAnswersByQuestionId = async (questionId) => {
    const response = await api.get(`${BASE_URL}?questionId=${questionId}`);
    return response.data;
};

export const updateAnswer = async (answerId, content) => {
    const response = await api.put(`${BASE_URL}/${answerId}`, { content });
    return response.data;
};

export const deleteAnswer = async (answerId) => {
    const response = await api.delete(`${BASE_URL}/${answerId}`);
    return response.data;
};