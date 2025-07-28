import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSideBar from './RightSideBar'
import useGetAllPost from '@/hooks/useGetAllPosts'
import useGetAllSuggestedUser from '@/hooks/useGetAllSuggestedUsers'
import { useSelector } from 'react-redux'

function Home() {
  const { user } = useSelector(store => store.auth)
  if (user) {
    useGetAllPost()
    useGetAllSuggestedUser()
  }
  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed />
        <Outlet></Outlet>
      </div>
      <RightSideBar />
    </div>
  )
}

export default Home