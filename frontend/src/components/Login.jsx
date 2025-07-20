import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';

function Login() {

    const dispatch=useDispatch();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const [loading ,setLoading]=useState(false)
    const navigate=useNavigate()

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
        }finally{
            setLoading(false)
        }
    };
    

    return (
        <div className='flex w-screen h-screen justify-center items-center'>
            <form onSubmit={signupHandler} className='flex flex-col shadow-lg gap-5 p-8 w-96 bg-slate-50'>
                <div className='my-4'>
                    <h1 className='text-center font-bold text-xl'>Logo</h1>
                    <p className='text-sm text-center'>See photos of your friend</p>
                </div>
                
                <div>
                    <span className='font-medium'>Email</span>
                    <Input
                        type='email'
                        name='email'
                        value={input.email}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-transparent my-2'
                    />
                </div>
                <div>
                    <span className='font-medium'>Password</span>
                    <Input
                        type='password'  // Fixed type case
                        name='password'
                        value={input.password}
                        onChange={changeEventHandler}
                        className='focus-visible:ring-transparent my-2'
                    />
                </div>

                {
                    loading ? (
                        <button>
                            <Loader className='mr-2 h-4 w-4 animate-spin'></Loader>
                        </button>
                    ):(
                        <Button type='submit'>Login</Button>
                    )
                }
               
                <span className='text-center'>Don`t have an account ?<Link to='/signup' className='text-blue-600'>SignUp</Link></span>
            </form>
        </div>
    );
}

export default Login;
