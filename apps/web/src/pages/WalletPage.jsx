import React from 'react';
import { useWallet } from '../hooks/useWallet';
import WalletWidget from '../components/wallet/WalletWidget';
import TransactionHistory from '../components/wallet/TransactionHistory';
import TopUpForm from '../components/wallet/TopUpForm';

const WalletPage = () => {
    const { balance, transactions, topUp } = useWallet();

    return (
        <div className="wallet-page">
            <h1>Your Wallet</h1>
            <WalletWidget balance={balance} />
            <TopUpForm onTopUp={topUp} />
            <TransactionHistory transactions={transactions} />
        </div>
    );
};

export default WalletPage;