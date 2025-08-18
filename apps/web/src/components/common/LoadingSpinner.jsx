import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({ size = 'md', text = '', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    const containerClasses = fullScreen 
        ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50'
        : 'flex flex-col items-center justify-center py-12';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner */}
                <div className="relative">
                    {/* Outer ring */}
                    <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}></div>
                    {/* Inner spinning ring */}
                    <div className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
                </div>

                {/* Loading text */}
                {text && (
                    <div className="text-center">
                        <p className={`text-gray-600 font-medium ${textSizeClasses[size]}`}>
                            {text}
                        </p>
                        <div className="flex items-center justify-center space-x-1 mt-2">
                            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Skeleton Loading Components
export const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex space-x-2 mb-4">
            <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex space-x-4">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-12 h-6 bg-gray-200 rounded"></div>
        </div>
    </div>
);

export const SkeletonList = ({ count = 3 }) => (
    <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </div>
);

export default LoadingSpinner;