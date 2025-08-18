import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaUsers, FaDollarSign, FaSearch, FaArrowRight } from 'react-icons/fa';
import QuestionList from '../components/questions/QuestionList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useQuestions from '../hooks/useQuestions';

const HomePage = () => {
    const { questions, loading } = useQuestions();

    const features = [
        {
            icon: FaQuestionCircle,
            title: "Ask Questions",
            description: "Get expert answers to your most challenging questions",
            color: "blue"
        },
        {
            icon: FaUsers,
            title: "Expert Network", 
            description: "Connect with verified professionals in your field",
            color: "green"
        },
        {
            icon: FaDollarSign,
            title: "Fair Compensation",
            description: "Reward experts for their valuable insights",
            color: "yellow"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 md:p-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Knowledge Marketplace
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Connect with experts, get answers, and share knowledge in our vibrant community
                    </p>
                    
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="What would you like to know?"
                                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-700 text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/register" 
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center"
                        >
                            Get Started
                            <FaArrowRight className="ml-2" />
                        </Link>
                        <Link 
                            to="/login" 
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                        <div className={`inline-flex p-4 rounded-full mb-4 ${
                            feature.color === 'blue' ? 'bg-blue-100' :
                            feature.color === 'green' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                            <feature.icon className={`w-8 h-8 ${
                                feature.color === 'blue' ? 'text-blue-600' :
                                feature.color === 'green' ? 'text-green-600' : 'text-yellow-600'
                            }`} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </section>

            {/* Stats Section */}
            <section className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                        <div className="text-gray-600">Questions Asked</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-green-600 mb-2">5K+</div>
                        <div className="text-gray-600">Experts</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                        <div className="text-gray-600">Satisfaction Rate</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-yellow-600 mb-2">$500K+</div>
                        <div className="text-gray-600">Paid to Experts</div>
                    </div>
                </div>
            </section>

            {/* Recent Questions */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Recent Questions</h2>
                    <Link 
                        to="/questions" 
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                        View All
                        <FaArrowRight className="ml-1 text-sm" />
                    </Link>
                </div>
                
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <QuestionList questions={questions?.slice(0, 3)} />
                )}
            </section>
        </div>
    );
};

export default HomePage;