import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaEye, FaComments, FaPlus, FaClock } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useQuestions from '../hooks/useQuestions';
import QuestionList from '../components/questions/QuestionList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AskerDashboard = () => {
    const { user, loading } = useAuth();
    const { questions, loading: questionsLoading, error } = useQuestions();

    if (loading || questionsLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">Error loading questions: {error.message}</p>
            </div>
        );
    }

    // Mock stats - replace with real data from API
    const stats = {
        totalQuestions: questions?.length || 0,
        totalViews: 847,
        totalAnswers: 23,
        pendingQuestions: 3
    };

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome back, {user?.username || 'Seeker'}! 🤔
                        </h1>
                        <p className="text-gray-600">
                            Discover answers to your questions and connect with experts in your field.
                        </p>
                    </div>
                    <Link
                        to="/questions/new"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center"
                    >
                        <FaPlus className="mr-2" />
                        Ask Question
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <FaQuestionCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">My Questions</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalQuestions}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full">
                            <FaEye className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalViews}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <FaComments className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Total Answers</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalAnswers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <FaClock className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                            <p className="text-2xl font-bold text-gray-800">{stats.pendingQuestions}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        to="/questions/new"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
                    >
                        <FaPlus className="text-gray-400 mr-3" />
                        <span className="text-gray-600 hover:text-blue-600">Ask New Question</span>
                    </Link>
                    <Link
                        to="/questions/browse"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
                    >
                        <FaQuestionCircle className="text-gray-400 mr-3" />
                        <span className="text-gray-600 hover:text-green-600">Browse Questions</span>
                    </Link>
                    <Link
                        to="/experts"
                        className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
                    >
                        <FaComments className="text-gray-400 mr-3" />
                        <span className="text-gray-600 hover:text-purple-600">Find Experts</span>
                    </Link>
                </div>
            </div>

            {/* My Questions Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">My Questions</h2>
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

export default AskerDashboard;