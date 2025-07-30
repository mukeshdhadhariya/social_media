import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSideBar from './RightSideBar'
import useGetAllPost from '@/hooks/useGetAllPosts'
import useGetAllSuggestedUser from '@/hooks/useGetAllSuggestedUsers'
import { useSelector } from 'react-redux'
import { Helmet } from "react-helmet";

function Home() {
  // const { user } = useSelector(store => store.auth)
  // if (user) {
    useGetAllPost()
    useGetAllSuggestedUser()
  // }
  return (
    <>
    <Helmet>
      <title>Profile | Social Media</title>
      <meta name="description" content="View and edit your profile on Social Media." />
      <link rel="canonical" href="https://social-media-es9m.vercel.app/profile" />
    </Helmet>
    <div className='flex'>
      <div className='flex-grow'>
        <Feed />
        <Outlet></Outlet>
      </div>
      <RightSideBar />
    </div>
    </>
  )
}

export default Home