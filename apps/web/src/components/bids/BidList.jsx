import React from 'react';
import { useBids } from '../../hooks/useBids';
import BidCard from './BidCard';

const BidList = () => {
    const { bids, loading, error } = useBids();

    if (loading) {
        return <div>Loading bids...</div>;
    }

    if (error) {
        return <div>Error loading bids: {error.message}</div>;
    }

    return (
        <div>
            <h2>Bids</h2>
            {bids.length === 0 ? (
                <p>No bids available.</p>
            ) : (
                <ul>
                    {bids.map(bid => (
                        <li key={bid.id}>
                            <BidCard bid={bid} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BidList;