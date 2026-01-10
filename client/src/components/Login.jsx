import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    // Local state for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Access loading state from Redux to disable button while logging in
    const { loading } = useSelector((state) => state.user);

    // Hooks for dispatching Redux actions and programmatic navigation
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        // Trigger loading state in Redux
        dispatch(loginStart());
        try {
            // API call to the authentication backend
            const res = await axiosInstance.post("http://localhost:5000/auth/login", { email, password });
            
            // On success: Update Redux store with user data and persist the token
            dispatch(loginSuccess(res.data));
            localStorage.setItem("access_token", res.data.token);

            // Redirect user to the homepage
            navigate("/");
        } catch (err) {
            // On failure: Reset loading state and notify the user
            dispatch(loginFailure());
            alert(err.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 dark:bg-black">
            <div className="relative bg-white p-6 sm:p-8 border border-gray-300 rounded-lg shadow-sm w-full max-w-112.5 dark:bg-neutral-800">
                {/* Close/Exit button redirecting to home */}
                <Link to="/">
                    <div className='absolute top-4 right-8'>&#10060;</div>
                </Link>
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
                    <p className="text-gray-600 text-sm">to continue to YouTube</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Email Input */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex justify-between items-center mt-4">
                        {/* Navigation to Signup */}
                        <Link to="/signup" className="text-blue-600 font-medium text-sm hover:text-blue-700 transition">
                            Create account
                        </Link>
                        
                        {/* Submit Button - Disabled during active API request */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:bg-gray-400`}>
                            {loading ? "Loading..." : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;