import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">Knowledge Marketplace</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/login" className="hover:underline">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </li>
                        <li>
                            <Link to="/wallet" className="hover:underline">Wallet</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;