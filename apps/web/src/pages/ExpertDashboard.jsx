import React from 'react';
import  useAuth  from '../hooks/useAuth';
import  useQuestions  from '../hooks/useQuestions';
import  QuestionList  from '../components/questions/QuestionList';
import  LoadingSpinner  from '../components/common/LoadingSpinner';

const ExpertDashboard = () => {
    const { user, loading } = useAuth();
    const { questions, loading: questionsLoading } = useQuestions();

    if (loading || questionsLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Expert Dashboard</h1>
            <p>Welcome, {user.username}! Here are your questions:</p>
            <QuestionList questions={questions} />
        </div>
    );
};

export default ExpertDashboard;