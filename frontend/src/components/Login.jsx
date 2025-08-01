import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';

function Login() {

    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const API_URL=import.meta.env.VITE_API_URL

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post(`${API_URL}/api/v1/user/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
                navigate("/")
                toast.success(res.data.message);
                setInput({
                    email: '',
                    password: ''
                })
            }
        } catch (error) {
            console.log("Login Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })


    return (
        <div className="flex w-screen h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white border border-gray-300 p-10 rounded-xl shadow-sm">
                {/* Logo & Intro */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Social Media</h1>
                    <p className="text-sm text-gray-500 mt-1">Connect and share moments with friends</p>
                </div>

                {/* Login Form */}
                <form onSubmit={signupHandler} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        {loading ? (
                            <button
                                type="button"
                                className="w-full flex justify-center items-center py-2 bg-blue-500 text-white font-semibold rounded-md cursor-not-allowed"
                            >
                                <Loader className="w-5 h-5 animate-spin" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
                            >
                                Log In
                            </button>
                        )}
                    </div>
                </form>

                {/* Bottom Text */}
                <div className="mt-6 text-center text-sm">
                    Don’t have an account?
                    <Link to="/signup" className="text-blue-600 font-medium hover:underline ml-1">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Login;
