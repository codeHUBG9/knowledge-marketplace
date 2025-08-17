import React, { useState } from 'react';

const AIDraft = () => {
    const [input, setInput] = useState('');
    const [draft, setDraft] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const generateDraft = async () => {
        // Call the AI service to generate a draft based on the input
        try {
            const response = await fetch('/api/ai/generate-draft', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input }),
            });
            const data = await response.json();
            setDraft(data.draft);
        } catch (error) {
            console.error('Error generating draft:', error);
        }
    };

    return (
        <div className="ai-draft-container">
            <h2>AI Draft Generator</h2>
            <textarea
                value={input}
                onChange={handleInputChange}
                placeholder="Enter your question or topic here..."
            />
            <button onClick={generateDraft}>Generate Draft</button>
            {draft && (
                <div className="draft-output">
                    <h3>Generated Draft:</h3>
                    <p>{draft}</p>
                </div>
            )}
        </div>
    );
};

export default AIDraft;