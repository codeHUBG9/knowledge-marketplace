import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptors for handling requests and responses
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error.response ? error.response.data : error);
    }
);

// Questions API
export const fetchQuestions = async () => {
    return await apiClient.get('/questions');
};

export const fetchQuestionById = async (id) => {
    return await apiClient.get(`/questions/${id}`);
};

export const createQuestion = async (questionData) => {
    return await apiClient.post('/questions', questionData);
};

// Moderation API
export const fetchModerationQueue = async () => {
    return await apiClient.get('/moderation/queue');
};

export const resolveFlag = async (flagId, resolution) => {
    return await apiClient.post(`/moderation/flags/${flagId}/resolve`, resolution);
};

export default apiClient;