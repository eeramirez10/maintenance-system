// src/presentation/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth()

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Email and password are required!');
            return;
        }

        // Simulate an API call
        const isValidUser = email === 'admin' && password === 'password';

        if (isValidUser) {
            login()
            alert('Login successful!');
            navigate('/equipment'); // Redirect to the equipment list
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <div className="space-y-6">
                    <input
                        type="email"
                        placeholder="Usuario o correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition"
                    >
                        Log In
                    </button>
                </div>
                {/* <p className="text-center text-gray-500 mt-6">
                    Don’t have an account? <span className="text-indigo-500 cursor-pointer hover:underline">Sign up</span>
                </p> */}
            </div>
        </div>
    );
};

export default LoginPage;
