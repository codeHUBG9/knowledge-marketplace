import React from 'react';
import  useWallet from '../../hooks/useWallet';
import { formatCurrency } from '../../utils/formatters';
const WalletWidget = () => {
    const { balance, transactions } = useWallet();

    return (
        <div className="wallet-widget">
            <h2 className="wallet-title">Wallet Balance</h2>
            <p className="wallet-balance">{formatCurrency(balance)}</p>
            <h3 className="transaction-history-title">Transaction History</h3>
            <ul className="transaction-list">
                {transactions.map((txn) => (
                    <li key={txn.id} className="transaction-item">
                        <span>{txn.date}</span>
                        <span>{formatCurrency(txn.amount)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WalletWidget;