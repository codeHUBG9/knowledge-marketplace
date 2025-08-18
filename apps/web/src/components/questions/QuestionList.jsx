import React from 'react';
import useQuestions from '../../hooks/useQuestions';
import QuestionCard from './QuestionCard';
import LoadingSpinner, { SkeletonList } from '../common/LoadingSpinner';
import { FaInbox, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QuestionList = ({ questions: propsQuestions, showSkeleton = true }) => {
    const { questions: hookQuestions, loading, error } = useQuestions();
    
    // Use props questions if provided, otherwise use hook questions
    const questions = propsQuestions || hookQuestions;

    if (loading && !propsQuestions && showSkeleton) {
        return <SkeletonList count={3} />;
    }

    if (loading && !propsQuestions && !showSkeleton) {
        return <LoadingSpinner size="lg" text="Loading questions..." />;
    }

    if (error && !propsQuestions) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Questions</h3>
                <p className="text-red-700 mb-4">We encountered an error while loading the questions. Please try again.</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                    <FaInbox className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No Questions Yet</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Be the first to ask a question! Our community of experts is ready to help you find the answers you need.
                    </p>
                    <div className="space-y-4">
                        <Link
                            to="/questions/new"
                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <FaPlus className="mr-2" />
                            Ask Your First Question
                        </Link>
                        <div className="text-sm text-gray-500">
                            <p>💡 Get expert answers • 🚀 Fast responses • 💰 Fair pricing</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {questions.map((question, index) => (
                <div key={question._id || index} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <QuestionCard question={question} />
                </div>
            ))}
            
            {/* Load More Button */}
            {questions.length >= 10 && (
                <div className="text-center pt-8">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Load More Questions
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestionList;