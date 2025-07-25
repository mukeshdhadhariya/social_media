import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { logout, setAuthUser, setsuggestedusers ,setuserprofile } from '@/redux/authSlice'
import { persistor } from "@/redux/store";
import CreatePost from './CreatePost'
import { setPosts, setselectedPost } from '@/redux/postSlice'

function LeftSideBar() {

    const {user}=useSelector(store=>store.auth)
    const [open, setOpen]=useState(false)

const SidebarItem=[
    {
        icon:<Home/>,
        text:"Home"
    },
    {
        icon:<Search/>,
        text:"Search"
    },
    {
        icon:<TrendingUp/>,
        text:"Explore"
    },
    {
        icon:<MessageCircle/>,
        text:"Messages"
    },
    {
        icon:<Heart/>,
        text:"Notification"
    },
    {
        icon:<PlusSquare/>,
        text:"Create"
    },
    {
        icon:(
                <Avatar className="w-8 h-8" >
                    <AvatarImage
                        src={user?.profilePicture}
                    />
                    <AvatarFallback className="bg-primary text-white text-sm">
                        {(user?.username || 'U')?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
        ),
        text:"Profile"
    },
    {
        icon:<LogOut/>,
        text:"Logout"
    },
]

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const LogoutHandler=async()=>{

        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
                withCredentials: true
            });

            if(res.data.success){
                dispatch(logout())
                dispatch(setAuthUser(null))
                dispatch(setPosts([]))
                dispatch(setselectedPost(null))
                dispatch(setsuggestedusers([]))
                dispatch(setuserprofile(null))
                persistor.purge();
                navigate("/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const sideBarHandler=(TextType)=>{
        if(TextType==='Logout'){
            LogoutHandler()
        }else if(TextType=='Create'){
            setOpen(true)
        }else if(TextType=='Profile'){
            navigate(`/profile/${user._id}`)
        }else if(TextType=='Home'){
            navigate('/')
        }
    }

  return (
    <div className='fixed top-0 z-10 left-0 h-screen border-r border-gray-300 px-4 w-[16%]'>
        <div className='flex flex-col'>
            <div>
                <h1 className='my-8 pl-3 font-bold text-xl'>{user?.username}</h1> 
                {
                    SidebarItem.map((item,index)=>{
                        return (
                            <div onClick={()=>sideBarHandler(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer p-3 rounded-lg my-3'>
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <CreatePost open={open} setOpen={setOpen}/>
        
    </div>
  )
}

export default LeftSideBar