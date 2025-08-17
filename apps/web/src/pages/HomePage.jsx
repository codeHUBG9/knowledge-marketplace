import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import QuestionList from '../components/questions/QuestionList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useQuestions } from '../hooks/useQuestions';

const HomePage = () => {
    const { questions, loading } = useQuestions();

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Knowledge Marketplace</h1>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <QuestionList questions={questions} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;