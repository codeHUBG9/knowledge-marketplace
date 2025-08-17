import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  {getQuestionById}  from '../services/questions';
import QuestionDetail from '../components/questions/QuestionDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const QuestionPage = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await getQuestionById(id);
                setQuestion(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {question ? <QuestionDetail question={question} /> : <div>Question not found.</div>}
        </div>
    );
};

export default QuestionPage;