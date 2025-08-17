import React from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { QuestionList } from '../components/questions/QuestionList';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const AskerDashboard = () => {
    const { questions, isLoading, error } = useQuestions();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading questions: {error.message}</div>;
    }

    return (
        <div>
            <h1>Asker Dashboard</h1>
            <QuestionList questions={questions} />
        </div>
    );
};

export default AskerDashboard;