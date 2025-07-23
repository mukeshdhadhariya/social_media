import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

function Posts() {
  const {posts}=useSelector(store=>store.post)
  console.log(posts)
  return (
    <div>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) =>
            post?._id ? (
              <Post key={post._id} post={post} />
            ) : null
          )
        ) : (
          <p>No posts available</p>
        )}

    </div>
  )
}

export default Posts