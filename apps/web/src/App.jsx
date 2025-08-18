import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import TestPage from './pages/TestPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuestionPage from './pages/QuestionPage';
import ExpertDashboard from './pages/ExpertDashboard';
import AskerDashboard from './pages/AskerDashboard';
import WalletPage from './pages/WalletPage';
import ProfilePage from './pages/ProfilePage';
import ModeratorDashboard from './pages/ModeratorDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/common/Layout';

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/questions/:id" element={
                                <Layout>
                                    <QuestionPage />
                                </Layout>
                            } />
                            <Route path="/expert-dashboard" element={
                                <Layout>
                                    <ExpertDashboard />
                                </Layout>
                            } />
                            <Route path="/asker-dashboard" element={
                                <Layout>
                                    <AskerDashboard />
                                </Layout>
                            } />
                            <Route path="/wallet" element={
                                <Layout>
                                    <WalletPage />
                                </Layout>
                            } />
                            <Route path="/profile" element={
                                <Layout>
                                    <ProfilePage />
                                </Layout>
                            } />
                            <Route path="/moderator-dashboard" element={
                                <Layout>
                                    <ModeratorDashboard />
                                </Layout>
                            } />
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;