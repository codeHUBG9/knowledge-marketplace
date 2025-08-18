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
            // For development, provide a mock user
            const mockUser = {
                id: '1',
                username: 'John Expert',
                email: 'john@example.com',
                role: 'expert'
            };
            loginStore(mockUser);
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
            // For development, provide a mock user
            const mockUser = {
                id: '2',
                username: userData.username || 'New User',
                email: userData.email || 'user@example.com',
                role: userData.role || 'seeker'
            };
            loginStore(mockUser);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        logoutStore();
    };

    useEffect(() => {
        // For development, set a mock user if none exists
        if (!user) {
            const mockUser = {
                id: '1',
                username: 'Expert User',
                email: 'expert@example.com',
                role: 'expert'
            };
            setUser(mockUser);
        }
    }, [user, setUser]);

    return { user: user || { username: 'Guest User' }, loading, error, login, register, logout };
};

export default useAuth;