import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await login(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <LoginForm onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
        </div>
    );
};

export default LoginPage;