import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchQuestions = async () => {
    try {
        const response = await axios.get(`${API_URL}/questions`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching questions');
    }
};

export const createQuestion = async (questionData) => {
    try {
        const response = await axios.post(`${API_URL}/questions`, questionData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating question');
    }
};

export const deleteQuestion = async (questionId) => {
    try {
        const response = await axios.delete(`${API_URL}/questions/${questionId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting question');
    }
};

export const fetchQuestionById = async (questionId) => {
    try {
        const response = await axios.get(`${API_URL}/questions/${questionId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching question by ID');
    }
};