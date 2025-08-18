import React from 'react';
import { FaQuestionCircle, FaDollarSign, FaStar, FaClock } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useQuestions from '../hooks/useQuestions';
import QuestionList from '../components/questions/QuestionList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ExpertDashboard = () => {
    const { user, loading } = useAuth();
    const { questions, loading: questionsLoading } = useQuestions();

    if (loading || questionsLoading) {
        return <LoadingSpinner />;
    }

    // Mock stats - replace with real data from API
    const stats = {
        totalQuestions: questions?.length || 0,
        totalEarnings: 1250.50,
        averageRating: 4.8,
        responseTime: '2.5 hrs'
    };

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome back, {user?.username || 'Expert'}! 👋
                </h1>
                <p className="text-gray-600">
                    Manage your expertise and help knowledge seekers find the answers they need.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <FaQuestionCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Total Questions</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalQuestions}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full">
                            <FaDollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
                            <p className="text-2xl font-bold text-gray-800">${stats.totalEarnings}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <FaStar className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.averageRating}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <FaClock className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Avg Response</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.responseTime}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Active Questions</h2>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                            View All
                        </button>
                        <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                            Filter
                        </button>
                    </div>
                </div>
                <QuestionList questions={questions} />
            </div>
        </div>
    );
};

export default ExpertDashboard;