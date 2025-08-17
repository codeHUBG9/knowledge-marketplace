import React from 'react';
import { useEffect } from 'react';
import { useStore } from '../store/authStore';
import ModQueue from '../components/moderation/ModQueue';
import Layout from '../components/common/Layout';

const ModeratorDashboard = () => {
    const { user, fetchUser } = useStore();

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Moderator Dashboard</h1>
            {user && user.role === 'moderator' ? (
                <ModQueue />
            ) : (
                <p>You do not have permission to view this page.</p>
            )}
        </Layout>
    );
};

export default ModeratorDashboard;