import React, { useState } from 'react';
import { useStore } from '../../store/questionStore';
import { createBid } from '../../services/bids';

const BidForm = ({ questionId }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null);
    const { addBid } = useStore(state => ({
        addBid: state.addBid
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount) {
            setError('Amount is required');
            return;
        }

        try {
            const bidData = await createBid({ questionId, amount });
            addBid(bidData);
            setAmount('');
            setError(null);
        } catch (err) {
            setError('Failed to create bid');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bid-form">
            <h2>Place a Bid</h2>
            {error && <p className="error">{error}</p>}
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter your bid amount"
                required
            />
            <button type="submit">Submit Bid</button>
        </form>
    );
};

export default BidForm;