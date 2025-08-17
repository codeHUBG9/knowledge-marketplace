import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <ProtectedRoute path="/questions/:id" component={QuestionPage} />
                    <ProtectedRoute path="/expert-dashboard" component={ExpertDashboard} />
                    <ProtectedRoute path="/asker-dashboard" component={AskerDashboard} />
                    <ProtectedRoute path="/wallet" component={WalletPage} />
                    <ProtectedRoute path="/profile" component={ProfilePage} />
                    <ProtectedRoute path="/moderator-dashboard" component={ModeratorDashboard} />
                </Switch>
                <Footer />
            </Layout>
        </Router>
    );
};

export default App;