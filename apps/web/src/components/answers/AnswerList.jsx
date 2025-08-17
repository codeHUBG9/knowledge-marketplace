import React from 'react';
import AnswerView from './AnswerView';

const AnswerList = ({ answers }) => {
    return (
        <div className="answer-list">
            {answers.length === 0 ? (
                <p>No answers available.</p>
            ) : (
                answers.map(answer => (
                    <AnswerView key={answer._id} answer={answer} />
                ))
            )}
        </div>
    );
};

export default AnswerList;