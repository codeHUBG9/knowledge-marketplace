import React, { useState } from 'react';
import Modal from 'react-modal';

const RatingModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ rating, comment });
        setRating(0);
        setComment('');
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Submit Your Rating</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating:</label>
                    <select value={rating} onChange={(e) => handleRatingChange(Number(e.target.value))}>
                        <option value={0}>Select a rating</option>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea value={comment} onChange={handleCommentChange} />
                </div>
                <button type="submit">Submit</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default RatingModal;