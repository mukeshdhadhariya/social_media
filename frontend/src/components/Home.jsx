// import React from 'react'
// import Feed from './Feed'
// import { Outlet } from 'react-router-dom'
// import RightSideBar from './RightSideBar'
// import useGetAllPost from '@/hooks/useGetAllPosts'
// import useGetAllSuggestedUser from '@/hooks/useGetAllSuggestedUsers'
// import { useSelector } from 'react-redux'
// import { Helmet } from "react-helmet";

// function Home() {
//   // const { user } = useSelector(store => store.auth)
//   // if (user) {
//     useGetAllPost()
//     useGetAllSuggestedUser()
//   // }
//   return (
//     <>
//     <Helmet>
//       <title>Home | Social Media</title>
//       <meta name="description" content="View and edit your profile on Social Media." />
//       <link rel="canonical" href="https://social-media-es9m.vercel.app/" />
//     </Helmet>
//     <div className='flex'>
//       <div className='flex-grow'>
//         <Feed />
//         <Outlet></Outlet>
//       </div>
//       <RightSideBar />
//     </div>
//     </>
//   )
// }

// export default Home

import React from 'react';
import Feed from './Feed';
import { Outlet } from 'react-router-dom';
import useGetAllPost from '@/hooks/useGetAllPosts';
import useGetAllSuggestedUser from '@/hooks/useGetAllSuggestedUsers';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
  useGetAllPost();
  useGetAllSuggestedUser();

  const { suggestedusers } = useSelector(store => store.auth);

  return (
    <div className="flex justify-center px-2 sm:px-4">
      {/* Center Column */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        
        {/* Suggested Users */}
        <div className="flex overflow-x-auto gap-3 py-2 px-1 md:hidden">
          {suggestedusers.map(user => (
            <Link key={user._id} to={`/profile/${user._id}`}>
              <div className="flex flex-col items-center min-w-[60px]">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback>{(user.username || 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs truncate w-full text-center">{user.username}</span>
              </div>
            </Link>
          ))}
        </div>


        {/* Main Feed */}
        <Feed />

        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
