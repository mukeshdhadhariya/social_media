import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedusers } = useSelector(store => store.auth);
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                Array.isArray(suggestedusers) && suggestedusers.length > 0 ? (
                    suggestedusers.map((user) => (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
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
                            <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400 mt-4">No suggested users found.</p>
                )
            }

        </div>
    )
}

export default SuggestedUsers