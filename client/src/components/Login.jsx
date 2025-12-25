import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Access loading state from Redux to disable button while logging in
    const { loading } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("http://localhost:5000/auth/login", { email, password });
            dispatch(loginSuccess(res.data));
            localStorage.setItem("access_token", res.data.token);
            navigate("/");
        } catch (err) {
            dispatch(loginFailure());
            alert(err.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-gray-50">
            <div className="relative bg-white p-8 border border-gray-300 rounded-lg shadow-sm w-full max-w-md">
                <Link to="/">
                    <div className='absolute top-4 right-8'>&#10060;</div>
                </Link>
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
                    <p className="text-gray-600 text-sm">to continue to YouTube</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex justify-between items-center mt-4">
                        <Link to="/signup" className="text-blue-600 font-medium text-sm hover:text-blue-700 transition">
                            Create account
                        </Link>

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