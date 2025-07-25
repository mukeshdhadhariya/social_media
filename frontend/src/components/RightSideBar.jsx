import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Link } from 'react-router-dom'
import SuggestedUsers from './SuggestedUsers'

function RightSideBar() {
  const { user } = useSelector(store => store.auth)

  return (
    <div className='w-fit my-10 pr-32'>

      <div className='flex items-center gap-2 mb-6'>
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback className="bg-primary text-white text-sm">
              {(user?.username || 'U')?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div>
          <h1 className='font-semibold text-sm'>
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
        </div>
      </div>

      <SuggestedUsers />
      
    </div>
  )
}

export default RightSideBar
