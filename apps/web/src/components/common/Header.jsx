
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaBars, 
  FaTimes, 
  FaQuestionCircle, 
  FaUser, 
  FaWallet,
  FaSignOutAlt,
  FaBell,
  FaSearch
} from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Browse Questions', href: '/questions', icon: FaQuestionCircle },
        { name: 'Find Experts', href: '/experts', icon: FaUser },
        { name: 'How it Works', href: '/how-it-works', icon: FaQuestionCircle },
    ];

    const userMenu = [
        { name: 'Dashboard', href: '/dashboard', icon: FaUser },
        { name: 'My Profile', href: '/profile', icon: FaUser },
        { name: 'Wallet', href: '/wallet', icon: FaWallet },
        { name: 'Settings', href: '/settings', icon: FaUser },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                                <FaQuestionCircle className="w-6 h-6 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Knowledge
                                </span>
                                <span className="text-2xl font-bold text-gray-800 ml-1">
                                    Marketplace
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                    isActive(item.href)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search questions, experts..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* Right Side - Auth/Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <FaBell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <FaUserCircle className="w-5 h-5 text-white" />
                                </div>
                                <span className="hidden md:block text-gray-700 font-medium">John Doe</span>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                                        <p className="text-sm text-gray-500">john@example.com</p>
                                        <div className="mt-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Expert
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {userMenu.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setIsProfileOpen(false)}
                                        >
                                            <item.icon className="w-4 h-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                    
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full text-left transition-colors">
                                            <FaSignOutAlt className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auth Buttons for logged out users */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <Link
                                to="/login"
                                className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 py-4 space-y-2">
                        {/* Mobile Search */}
                        <div className="relative mb-4">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Mobile Navigation */}
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                    isActive(item.href)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        ))}

                        {/* Mobile Auth */}
                        <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                            <Link
                                to="/login"
                                className="block px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside to close dropdowns */}
            {(isMenuOpen || isProfileOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsMenuOpen(false);
                        setIsProfileOpen(false);
                    }}
                ></div>
            )}
        </header>
    );
};

export default Header;