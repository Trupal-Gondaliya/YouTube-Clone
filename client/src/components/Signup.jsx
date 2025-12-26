import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("http://localhost:5000/auth/signup", { username, email, password });
            alert("Registration Successful!");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className=" flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-gray-50">
            <div className="relative bg-white p-8 border border-gray-300 rounded-lg shadow-sm w-full max-w-md">
                <Link to="/">
                    <div className='absolute top-4 right-8'>&#10060;</div>
                </Link>
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-2xl font-semibold mb-2">Create your Account</h1>
                    <p className="text-gray-600 text-sm">to continue to YouTube</p>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        onChange={e => setUsername(e.target.value)}
                        required />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        onChange={e => setEmail(e.target.value)}
                        required />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        onChange={e => setPassword(e.target.value)}
                        required />

                    <div className="flex justify-between items-center mt-6">
                        <Link to="/login" className="text-blue-600 font-medium text-sm hover:underline">
                            Sign in instead
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
