import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSideBar from './RightSideBar'
import useGetAllPost from '@/hooks/useGetAllPosts'
import useGetAllSuggestedUser from '@/hooks/useGetAllSuggestedUsers'

function Home() {
  useGetAllPost()
  useGetAllSuggestedUser()
  return (
    <div className='flex'>
       <div className='flex-grow'>
        <Feed/>
        <Outlet></Outlet>
      </div>
      <RightSideBar/>
    </div>
  )
}

export default Home