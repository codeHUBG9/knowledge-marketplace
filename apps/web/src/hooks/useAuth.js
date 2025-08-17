import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { login as loginService, register as registerService } from '../services/auth';

const useAuth = () => {
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const loginStore = useAuthStore((state) => state.login);
    const logoutStore = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const { user } = await loginService(credentials);
            loginStore(user);
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
            const { user } = await registerService(userData);
            loginStore(user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        logoutStore();
    };

    useEffect(() => {
        // Optionally, you can add logic to check for existing user session
    }, []);

    return { user, loading, error, login, register, logout };
};

export default useAuth;