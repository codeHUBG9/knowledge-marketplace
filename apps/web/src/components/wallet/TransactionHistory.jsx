import React from 'react';
import  useWallet  from '../../hooks/useWallet';
import { formatCurrency } from '../../utils/formatters';

const TransactionHistory = () => {
    const { transactions } = useWallet();

    return (
        <div className="transaction-history">
            <h2>Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul>
                    {transactions.map((txn) => (
                        <li key={txn._id} className={`transaction ${txn.transactionType}`}>
                            <span>{txn.date}</span>
                            <span>{formatCurrency(txn.amount)}</span>
                            <span>{txn.transactionType}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionHistory;