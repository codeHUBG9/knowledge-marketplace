import React from 'react';

const QuestionCard = ({ question }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md mb-4">
            <h2 className="text-xl font-bold">{question.title}</h2>
            <p className="text-gray-700">{question.description}</p>
            <div className="mt-2">
                <span className="text-sm text-gray-500">Asked by: {question.userId}</span>
            </div>
        </div>
    );
};

export default QuestionCard;