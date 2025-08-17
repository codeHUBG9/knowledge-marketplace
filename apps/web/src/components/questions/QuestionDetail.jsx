import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuestions } from '../../hooks/useQuestions';
import LoadingSpinner from '../common/LoadingSpinner';
import AnswerList from '../answers/AnswerList';
import BidList from '../bids/BidList';

const QuestionDetail = () => {
    const { questionId } = useParams();
    const { question, isLoading, error } = useQuestions(questionId);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading question details.</div>;
    }

    return (
        <div className="question-detail">
            <h1>{question.title}</h1>
            <p>{question.description}</p>
            <h2>Answers</h2>
            <AnswerList questionId={questionId} />
            <h2>Bids</h2>
            <BidList questionId={questionId} />
        </div>
    );
};

export default QuestionDetail;