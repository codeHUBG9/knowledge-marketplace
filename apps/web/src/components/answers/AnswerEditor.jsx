import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuestions } from '../../hooks/useQuestions';
import { useAuth } from '../../hooks/useAuth';

const AnswerEditor = () => {
    const { questionId } = useParams();
    const { fetchQuestion, updateAnswer } = useQuestions();
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateAnswer(questionId, { content });
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Error updating answer:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="answer-editor">
            <h2>Edit Your Answer</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your answer here..."
                    required
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Update Answer'}
                </button>
            </form>
        </div>
    );
};

export default AnswerEditor;