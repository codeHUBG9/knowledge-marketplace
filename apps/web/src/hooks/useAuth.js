import { useState, useEffect } from 'react';
import { useStore } from '../store/authStore';
import { login as loginService, register as registerService } from '../services/auth';

const useAuth = () => {
    const { user, setUser, setToken } = useStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const { user, token } = await loginService(credentials);
            setUser(user);
            setToken(token);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const { user, token } = await registerService(userData);
            setUser(user);
            setToken(token);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    useEffect(() => {
        // Optionally, you can add logic to check for existing user session
    }, []);

    return { user, loading, error, login, register, logout };
};

export default useAuth;