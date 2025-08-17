import React from 'react';

const AnswerView = ({ answer }) => {
    return (
        <div className="answer-view">
            <p>{answer.content}</p>
            <small>Answered by: {answer.userId}</small>
        </div>
    );
};

export default AnswerView;