import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaDollarSign, 
  FaClock, 
  FaEye, 
  FaComments, 
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const QuestionCard = ({ question }) => {
    // Mock data for demonstration - replace with actual question data
    const mockData = {
        id: question?._id || "sample-id",
        title: question?.title || "How to implement real-time notifications in a React application?",
        description: question?.description || "I'm building a React application and need to implement real-time notifications for user interactions. What's the best approach using WebSockets or Server-Sent Events? I'm particularly interested in scalability considerations and browser compatibility.",
        askerName: question?.askerName || "Sarah Chen",
        askerAvatar: question?.askerAvatar || "👩‍💻",
        askerRating: question?.askerRating || 4.8,
        bounty: question?.bounty || 75,
        timeAgo: question?.timeAgo || "3 hours ago",
        views: question?.views || 24,
        answers: question?.answerCount || 7,
        category: question?.category || "Web Development",
        tags: question?.tags || ["React", "WebSockets", "Real-time", "JavaScript"],
        status: question?.status || "open",
        urgency: question?.urgency || "medium",
        isVerified: question?.isVerified || true
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'open': 
                return { 
                    color: 'bg-green-100 text-green-800 border-green-200', 
                    icon: FaExclamationTriangle,
                    text: 'Open'
                };
            case 'in-progress': 
                return { 
                    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
                    icon: FaClock,
                    text: 'In Progress'
                };
            case 'resolved': 
                return { 
                    color: 'bg-blue-100 text-blue-800 border-blue-200', 
                    icon: FaCheckCircle,
                    text: 'Resolved'
                };
            default: 
                return { 
                    color: 'bg-gray-100 text-gray-800 border-gray-200', 
                    icon: FaClock,
                    text: 'Unknown'
                };
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'high': return 'border-l-red-500';
            case 'medium': return 'border-l-yellow-500';
            case 'low': return 'border-l-green-500';
            default: return 'border-l-gray-300';
        }
    };

    const statusConfig = getStatusConfig(mockData.status);
    const StatusIcon = statusConfig.icon;

    return (
        <Link to={`/questions/${mockData.id}`} className="block group">
            <div className={`bg-white border-l-4 ${getUrgencyColor(mockData.urgency)} rounded-r-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden`}>
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                                {mockData.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                {mockData.description}
                            </p>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color} shrink-0`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusConfig.text}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-200">
                            {mockData.category}
                        </span>
                        {mockData.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                #{tag}
                            </span>
                        ))}
                        {mockData.tags.length > 3 && (
                            <span className="inline-block bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                                +{mockData.tags.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Asker Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {mockData.askerAvatar}
                                </div>
                                <div>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-sm font-medium text-gray-900">{mockData.askerName}</span>
                                        {mockData.isVerified && (
                                            <FaCheckCircle className="w-4 h-4 text-blue-500" title="Verified User" />
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <FaStar className="w-3 h-3 text-yellow-400" />
                                        <span className="text-xs text-gray-500">{mockData.askerRating}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <FaClock className="w-3 h-3" />
                                <span>{mockData.timeAgo}</span>
                            </div>
                        </div>
                        
                        {/* Bounty */}
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-3 py-1 rounded-full border border-green-200">
                            <FaDollarSign className="w-4 h-4" />
                            <span className="font-bold">{mockData.bounty}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1 text-gray-600">
                                <FaEye className="w-4 h-4" />
                                <span>{mockData.views} views</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-600">
                                <FaComments className="w-4 h-4" />
                                <span>{mockData.answers} answers</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-blue-600 font-medium group-hover:text-blue-700">
                            <span>View Details</span>
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default QuestionCard;