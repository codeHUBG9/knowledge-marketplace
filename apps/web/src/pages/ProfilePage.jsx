import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import { WalletWidget } from '../components/wallet/WalletWidget';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const ProfilePage = () => {
    const { user, loading } = useAuth();
    const { balance } = useWallet();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                    <p>Wallet Balance: ${balance}</p>
                    <WalletWidget />
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default ProfilePage;