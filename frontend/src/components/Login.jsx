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

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
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
        // <div className='flex w-screen h-screen justify-center items-center'>
        //     <form onSubmit={signupHandler} className='flex flex-col shadow-lg gap-5 p-8 w-96 bg-slate-50'>
        //         <div className='my-4'>
        //             <h1 className='text-center font-bold text-xl'>Logo</h1>
        //             <p className='text-sm text-center'>See photos of your friend</p>
        //         </div>

        //         <div>
        //             <span className='font-medium'>Email</span>
        //             <Input
        //                 type='email'
        //                 name='email'
        //                 value={input.email}
        //                 onChange={changeEventHandler}
        //                 className='focus-visible:ring-transparent my-2'
        //             />
        //         </div>
        //         <div>
        //             <span className='font-medium'>Password</span>
        //             <Input
        //                 type='password'  // Fixed type case
        //                 name='password'
        //                 value={input.password}
        //                 onChange={changeEventHandler}
        //                 className='focus-visible:ring-transparent my-2'
        //             />
        //         </div>

        //         {
        //             loading ? (
        //                 <button>
        //                     <Loader className='mr-2 h-4 w-4 animate-spin'></Loader>
        //                 </button>
        //             ) : (
        //                 <Button type='submit'>Login</Button>
        //             )
        //         }

        //         <span className='text-center'>Don`t have an account ?<Link to='/signup' className='text-blue-600'>SignUp</Link></span>
        //     </form>
        // </div>
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
