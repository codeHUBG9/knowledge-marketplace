import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <div className="review-card border p-4 rounded shadow-md">
            <div className="review-header flex justify-between items-center">
                <h3 className="font-bold">{review.userId}</h3>
                <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="review-comment mt-2">{review.comment}</p>
        </div>
    );
};

export default ReviewCard;