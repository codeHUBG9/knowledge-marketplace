import { useEffect } from 'react';
import { useStore } from '../store/questionStore';
import { fetchQuestions } from '../services/questions';

const useQuestions = () => {
    const { questions, setQuestions } = useStore();

    useEffect(() => {
        const loadQuestions = async () => {
            const fetchedQuestions = await fetchQuestions();
            setQuestions(fetchedQuestions);
        };

        loadQuestions();
    }, [setQuestions]);

    return { questions };
};

export default useQuestions;