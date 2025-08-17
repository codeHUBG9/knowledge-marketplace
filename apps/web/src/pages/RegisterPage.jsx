import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (userData) => {
        try {
            await registerUser(userData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            {error && <p className="error">{error}</p>}
            <RegisterForm onRegister={handleRegister} />
        </div>
    );
};

export default RegisterPage;