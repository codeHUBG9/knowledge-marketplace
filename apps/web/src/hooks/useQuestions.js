import { useState, useEffect } from 'react';
import useStore from '../store/questionStore';
import { fetchQuestions } from '../services/questions';

const useQuestions = () => {
    const { questions, setQuestions } = useStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadQuestions = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedQuestions = await fetchQuestions();
                setQuestions(fetchedQuestions);
            } catch (err) {
                setError(err);
                // Provide fallback mock data for development
                setQuestions([
                    {
                        _id: '1',
                        title: 'How to implement React hooks effectively?',
                        description: 'I am struggling with understanding the best practices for using React hooks in a large application.',
                        askerName: 'John Doe',
                        bounty: 50,
                        timeAgo: '2 hours ago',
                        views: 24,
                        answerCount: 3,
                        category: 'React',
                        status: 'open'
                    },
                    {
                        _id: '2',
                        title: 'Best practices for Node.js API design?',
                        description: 'Looking for advice on structuring REST APIs with Express.js and proper error handling.',
                        askerName: 'Jane Smith',
                        bounty: 75,
                        timeAgo: '4 hours ago',
                        views: 18,
                        answerCount: 2,
                        category: 'Node.js',
                        status: 'in-progress'
                    },
                    {
                        _id: '3',
                        title: 'Database optimization techniques for MongoDB?',
                        description: 'My MongoDB queries are slow and I need help with indexing and query optimization.',
                        askerName: 'Bob Johnson',
                        bounty: 100,
                        timeAgo: '1 day ago',
                        views: 35,
                        answerCount: 5,
                        category: 'Database',
                        status: 'resolved'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, [setQuestions]);

    return { questions: questions || [], loading, error };
};

export default useQuestions;