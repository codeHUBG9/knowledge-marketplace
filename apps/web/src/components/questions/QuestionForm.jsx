import React, { useState } from 'react';
import { useQuestions } from '../../hooks/useQuestions';

const QuestionForm = () => {
    const { createQuestion } = useQuestions();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError('Title and description are required.');
            return;
        }
        setError('');
        try {
            await createQuestion({ title, description });
            setTitle('');
            setDescription('');
        } catch (err) {
            setError('Failed to create question. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="question-form">
            <h2>Create a New Question</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default QuestionForm;