import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { useStore } from '../../store/walletStore';

const TopUpForm = () => {
    const [amount, setAmount] = useState('');
    const { topUpWallet } = useWallet();
    const { setBalance } = useStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await topUpWallet(amount);
            if (response.success) {
                setBalance(response.newBalance);
                setAmount('');
                alert('Wallet topped up successfully!');
            } else {
                alert('Failed to top up wallet: ' + response.message);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="top-up-form">
            <h2>Top Up Your Wallet</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
            />
            <button type="submit">Top Up</button>
        </form>
    );
};

export default TopUpForm;