import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('https://mern-invoice-gen-api.onrender.com/api/auth/register', { name, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Signup failed', error);
        }
        console.log('Form submitted:', { name, email, password });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <nav className="flex justify-between items-center p-4 bg-gray-900">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                        <div className="w-6 h-6 bg-gray-800 transform rotate-45"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold">levitation</span>
                        <span className="text-sm text-gray-400">infotech</span>
                    </div>
                </div>
                <button className="px-4 py-2 bg-lime-500 text-black rounded-md hover:bg-lime-600 transition-colors"
                    onClick={() => window.location.href = '/login'}>
                    Login
                </button>
            </nav>
            <div className="flex-grow flex flex-col md:flex-row">
                <div className="absolute bottom-10 right-3/4 w-96 h-96 bg-gradient-to-tr from-lime-500 to-transparent rounded-full filter blur-xl opacity-50 transform translate-x-3 translate-y-3 "></div>
                <div className="absolute bottom-30 left-48 w-96 h-72 bg-gradient-to-tr from-lime-500 to-transparent rounded-full filter blur-2xl opacity-50 transform -translate-x-1 translate-y-1/4 "></div>
                <div className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center p-8">
                    <img
                        src="https://i.ibb.co/jfxnppH/Asset.png"
                        alt="Decorative image"
                        className="w-auto max-h-[80vh] object-contain rounded-3xl"
                    />

                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
                    <div className="w-full max-w-md space-y-8 relative z-10">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Sign up to begin journey</h2>
                            <p className="text-gray-400">
                                This is basic signup page which is used for levitation assignment purpose.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    Enter your name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p className="mt-1 text-sm text-gray-400">
                                    This name will be displayed with your inquiry
                                </p>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md"
                                    placeholder="Enter Email ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className="mt-1 text-sm text-gray-400">
                                    This email will be displayed with your inquiry
                                </p>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    className="w-full px-3 py-2 bg-gray-700 rounded-md"
                                    placeholder="Enter the Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="mt-1 text-sm text-gray-400">
                                    Any further updates will be forwarded on this Email ID
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-700 text-lime-500 rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Register
                                </button>
                                <a href="/login" className="text-sm text-gray-400 hover:underline">
                                    Already have account ?
                                </a>
                            </div>
                        </form>
                    </div>
                    <div className="absolute top-100 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500 to-transparent rounded-full filter blur-xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        </div>
    );
}