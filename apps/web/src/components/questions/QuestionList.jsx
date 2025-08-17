import React from 'react';
import { useQuestions } from '../../hooks/useQuestions';
import QuestionCard from './QuestionCard';
import LoadingSpinner from '../common/LoadingSpinner';

const QuestionList = () => {
    const { questions, loading, error } = useQuestions();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading questions: {error.message}</div>;
    }

    return (
        <div className="question-list">
            {questions.length === 0 ? (
                <p>No questions available.</p>
            ) : (
                questions.map(question => (
                    <QuestionCard key={question._id} question={question} />
                ))
            )}
        </div>
    );
};

export default QuestionList;