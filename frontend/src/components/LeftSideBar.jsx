// import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
// import React, { useState } from 'react'
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar"
// import { toast } from 'sonner'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux'
// import store from '@/redux/store'
// import { logout, setAuthUser, setsuggestedusers, setuserprofile } from '@/redux/authSlice'
// import { persistor } from "@/redux/store";
// import CreatePost from './CreatePost'
// import { Button } from './ui/button'
// import { setPosts, setselectedPost } from '@/redux/postSlice'
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

// function LeftSideBar() {

//     const { user } = useSelector(store => store.auth)
//     const { likenotification, follownotification } = useSelector(store => store.rtn)
//     const [open, setOpen] = useState(false)
//     const API_URL=import.meta.env.VITE_API_URL

//     const SidebarItem = [
//         {
//             icon: <Home />,
//             text: "Home"
//         },
//         {
//             icon: <Search />,
//             text: "Search"
//         },
//         {
//             icon: <TrendingUp />,
//             text: "Explore"
//         },
//         {
//             icon: <MessageCircle />,
//             text: "Messages"
//         },
//         {
//             icon: <Heart />,
//             text: "Notification"
//         },
//         {
//             icon: <PlusSquare />,
//             text: "Create"
//         },
//         {
//             icon: (
//                 <Avatar className="w-8 h-8" >
//                     <AvatarImage
//                         src={user?.profilePicture}
//                     />
//                     <AvatarFallback className="bg-primary text-white text-sm">
//                         {(user?.username || 'U')?.slice(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                 </Avatar>
//             ),
//             text: "Profile"
//         },
//         {
//             icon: <LogOut />,
//             text: "Logout"
//         },
//     ]

//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const LogoutHandler = async () => {

//         try {
//             const res = await axios.get(`${API_URL}/api/v1/user/logout`, {
//                 withCredentials: true
//             });

//             if (res.data.success) {
//                 localStorage.removeItem("persist:root")
//                 localStorage.clear(); // 🔥 important
//                 sessionStorage.clear();
//                 dispatch(logout())
//                 dispatch(setAuthUser(null))
//                 dispatch(setPosts([]))
//                 dispatch(setselectedPost(null))
//                 dispatch(setsuggestedusers([]))
//                 dispatch(setuserprofile(null))
//                 persistor.purge();
//                 navigate("/login")
//                 toast.success(res.data.message)
//             }
//         } catch (error) {
//             toast.error(error.response.data.message)
//         }
//     }

//     const sideBarHandler = (TextType) => {
//         if (TextType === 'Logout') {
//             LogoutHandler()
//         } else if (TextType == 'Create') {
//             setOpen(true)
//         } else if (TextType == 'Profile') {
//             navigate(`/profile/${user._id}`)
//         } else if (TextType == 'Home') {
//             navigate('/')
//         } else if (TextType === 'Messages') {
//             navigate("/chat");
//         }
//     }

//     return (
//         <div className='fixed top-0 z-10 left-0 h-screen border-r border-gray-300 px-4 w-[16%]'>
//             <div className='flex flex-col'>
//                 <div>
//                     <h1 className='my-8 pl-3 font-bold text-xl'>{user?.username}</h1>
//                     {
//                         SidebarItem.map((item, index) => {
//                             return (
//                                 <div onClick={() => sideBarHandler(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer p-3 rounded-lg my-3'>
//                                     {item.icon}
//                                     <span>{item.text}</span>
//                                     {
//                                         item.text === 'Notification' && likenotification.length > 0 && (
//                                             <Popover>
//                                                 <PopoverTrigger asChild>
//                                                     <Button size='icon' className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6">{likenotification.length + follownotification.length}</Button>
//                                                 </PopoverTrigger>
//                                                 <PopoverContent>
//                                                     <div>
//                                                         {
//                                                             likenotification.length === 0 ? (<p>No notifications</p>) : (
//                                                                 likenotification.map((notification) => {
//                                                                     return (
//                                                                         <div
//                                                                             key={notification.userId}
//                                                                             className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition duration-200 shadow-sm"
//                                                                         >
//                                                                             <Avatar className="w-10 h-10 ring-2 ring-primary/20">
//                                                                                 <AvatarImage src={notification.userDetails?.profilePicture} />
//                                                                                 <AvatarFallback className="text-xs bg-primary text-white">
//                                                                                     {(notification.userDetails?.username || 'U')?.slice(0, 2).toUpperCase()}
//                                                                                 </AvatarFallback>
//                                                                             </Avatar>
//                                                                             <div className="flex flex-col">
//                                                                                 <span className="text-sm text-gray-800 dark:text-gray-200">
//                                                                                     <span className="font-semibold">{notification.userDetails?.username}</span>{" "}
//                                                                                     <span className="text-gray-600 dark:text-gray-400">liked your post</span>
//                                                                                 </span>
//                                                                                 <span className="text-xs text-gray-400">Just now</span>
//                                                                             </div>
//                                                                         </div>

//                                                                     )
//                                                                 })
//                                                             ) }{
//                                                             follownotification.length === 0 ? (<p></p>) : (
//                                                                 follownotification.map((notification) => {
//                                                                     return (
//                                                                         <div
//                                                                             key={notification.senderId}
//                                                                             className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition duration-200 shadow-sm"
//                                                                         >
//                                                                             <Avatar className="w-10 h-10 ring-2 ring-primary/20">
//                                                                                 <AvatarImage src={notification.SenderDetails?.profilePicture} />
//                                                                                 <AvatarFallback className="text-xs bg-primary text-white">
//                                                                                     {(notification.SenderDetails?.username || 'U')?.slice(0, 2).toUpperCase()}
//                                                                                 </AvatarFallback>
//                                                                             </Avatar>
//                                                                             <div className="flex flex-col">
//                                                                                 <span className="text-sm text-gray-800 dark:text-gray-200">
//                                                                                     <span className="font-semibold">{notification.SenderDetails?.username}</span>{" "}
//                                                                                     <span className="text-gray-600 dark:text-gray-400">starting following you</span>
//                                                                                 </span>
//                                                                                 <span className="text-xs text-gray-400">Just now</span>
//                                                                             </div>
//                                                                         </div>

//                                                                     )
//                                                                 })
//                                                             )
//                                                         }
//                                                     </div>
//                                                 </PopoverContent>
//                                             </Popover>
//                                         )
//                                     }
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </div>

//             <CreatePost open={open} setOpen={setOpen} />

//         </div>
//     )
// }

// export default LeftSideBar



// LeftSideBar.jsx
import { useState } from 'react';
import { Home, Search, TrendingUp, MessageCircle, Heart, PlusSquare, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from './ui/button';
import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setAuthUser } from '@/redux/authSlice';
import { persistor } from "@/redux/store";
import { toast } from 'sonner';

function LeftSideBar() {
  const { user } = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SidebarItem = [
    { icon: <Home />, text: 'Home' },
    { icon: <Search />, text: 'Search' },
    { icon: <TrendingUp />, text: 'Explore' },
    { icon: <MessageCircle />, text: 'Messages' },
    { icon: <Heart />, text: 'Notification' },
    {
      icon: <Avatar className="w-6 h-6">
        <AvatarImage src={user?.profilePicture} />
        <AvatarFallback>{(user?.username || 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>,
      text: 'Profile'
    },
    { icon: <PlusSquare />, text: 'Create' },
    { icon: <LogOut />, text: 'Logout' },
  ];

  const handleClick = (text) => {
    if (text === 'Logout') {
      dispatch(logout());
      dispatch(setAuthUser(null));
      persistor.purge();
      navigate('/login');
      toast.success('Logged out');
    } else if (text === 'Create') setOpen(true);
    else if (text === 'Profile') navigate(`/profile/${user._id}`);
    else if (text === 'Home') navigate('/');
    else if (text === 'Messages') navigate('/chat');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 border-r border-gray-300 flex-col p-4">
        <h1 className="my-8 font-bold text-xl">{user?.username}</h1>
        <div className="flex flex-col gap-3">
          {SidebarItem.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
              onClick={() => handleClick(item.text)}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-300 flex justify-around py-2 shadow-inner">
        {SidebarItem.slice(0, 5).map((item, i) => (
          <button key={i} className="flex flex-col items-center text-gray-700" onClick={() => handleClick(item.text)}>
            {item.icon}
            <span className="text-xs">{item.text}</span>
          </button>
        ))}

        {/* Profile button */}
        <button className="flex flex-col items-center text-gray-700" onClick={() => handleClick('Profile')}>
          <Avatar className="w-6 h-6">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>{(user?.username || 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-xs">Profile</span>
        </button>

        {/* Create button */}
        <button onClick={() => setOpen(true)} className="flex flex-col items-center text-gray-700">
          <PlusSquare />
          <span className="text-xs">Create</span>
        </button>
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </>
  );
}

export default LeftSideBar;
