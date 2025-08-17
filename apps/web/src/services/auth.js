import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const logout = async () => {
    // Implement logout functionality if needed
};

export const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user : null;
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const clearUser = () => {
    localStorage.removeItem('user');
};