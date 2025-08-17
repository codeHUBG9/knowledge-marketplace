import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
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
            <Layout>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/questions/:id" element={<QuestionPage />} />
                        <Route path="/expert-dashboard" element={<ExpertDashboard />} />
                        <Route path="/asker-dashboard" element={<AskerDashboard />} />
                        <Route path="/wallet" element={<WalletPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/moderator-dashboard" element={<ModeratorDashboard />} />
                    </Route>
                </Routes>
                <Footer />
            </Layout>
        </Router>
    );
};

export default App;