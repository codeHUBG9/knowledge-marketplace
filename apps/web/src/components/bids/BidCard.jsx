import React from 'react';

const BidCard = ({ bid }) => {
    return (
        <div className="bid-card">
            <h3 className="bid-amount">${bid.amount}</h3>
            <p className="bid-user">Bidder: {bid.userId}</p>
            <p className="bid-question">Question ID: {bid.questionId}</p>
        </div>
    );
};

export default BidCard;