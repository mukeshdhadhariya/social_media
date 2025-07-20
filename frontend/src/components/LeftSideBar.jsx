import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux'
import store from '@/redux/store'


function LeftSideBar() {

const {user}=useSelector(store=>store.auth)


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
            <Avatar className='w-7 h-7'>
            <AvatarImage src={user?.profilePicture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
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

    const LogoutHandler=async()=>{
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout', {
                withCredentials: true
            });
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const sideBarHandler=(TextType)=>{
        if(TextType==='Logout')LogoutHandler();
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
    </div>
  )
}

export default LeftSideBar