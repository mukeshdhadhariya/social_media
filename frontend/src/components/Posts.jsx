import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

function Posts() {
  const {posts}=useSelector(store=>store.post)
  return (
    <div>
        {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) =>
              post?._id ? <Post key={post._id} post={post} /> : null
            )
          ) : (
            <p className="text-center text-gray-500 mt-4">No posts available yet. Start by creating one!</p>
          )
        }

    </div>
  )
}

export default Posts