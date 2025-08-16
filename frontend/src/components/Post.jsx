import React, { useEffect, useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Bookmark, MessageCircle, Send } from 'lucide-react'
import { Button } from './ui/button'
import { DialogDemo } from './DialogDemo'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setPosts, setselectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'
import { setAuthUser } from '@/redux/authSlice'

function Post({ post }) {

    const [text, setText] = useState("");
    const { user } = useSelector(store => store.auth)
    const [open, setOpen] = useState(false)
    const [liked, setliked] = useState(post.likes.includes(user?._id) || false)
    const [postlike, setPostlike] = useState(post.likes.length)
    const [comments, setComments] = useState(post.comments)
    const { posts } = useSelector((store) => store.post)
    const dispatch = useDispatch()
    const API_URL=import.meta.env.VITE_API_URL
    const [isBookmarked, setIsBookmarked] = useState(
        user?.bookmarks?.some((pst) => String(pst) === String(post._id))
    );

    const changeEventHandler = (e) => {
        const inputText = e.target.value
        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText("")
        }
    }

    const likeOrdislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like'
            const res = await axios.get(`${API_URL}/api/v1/post/${post._id}/${action}`, { withCredentials: true })
            if (res.data.success) {
                const updatedlike = liked ? postlike - 1 : postlike + 1
                setPostlike(updatedlike)
                setliked(!liked)
                const updatedpostdata = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                )
                dispatch(setPosts(updatedpostdata));
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(res.data.message)
        }
    }

    const commmentHandler = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/v1/post/${post._id}/comment`, { text },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
            if (res.data.success) {

                const updatedCommentData = [...comments, res.data.comment];
                setComments(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                setText("")
                toast.success(res.data.message)
            }
        } catch (error) {
            const errMsg =
                error?.response?.data?.message || "Failed to post comment";
            toast.error(errMsg);
        }
    }

    const bookmarkHandler = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/v1/post/${post?._id}/bookmark`, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
                const updatedBookmarks = isBookmarked
                    ? user.bookmarks.filter(id => String(id) !== String(post._id))
                    : [...user.bookmarks, post._id];

                dispatch(setAuthUser({
                    ...user,
                    bookmarks: updatedBookmarks,
                }));

                setIsBookmarked(!isBookmarked);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // <div className='my-8 w-full mx-auto max-w-sm '>

        //     <div className="flex justify-between items-center px-2 py-2">
        //         <div className="flex items-center gap-3">
        //             <Link to={`/profile/${post?.author?._id}`}>
        //                 <Avatar className="w-9 h-9 ring-2 ring-primary/50">
        //                     <AvatarImage
        //                         src={post?.author?.profilePicture}
        //                         alt={post?.author?.username}
        //                     />
        //                     <AvatarFallback className="bg-primary text-white text-sm">
        //                         {(post?.author?.username || 'U')?.slice(0, 2).toUpperCase()}
        //                     </AvatarFallback>
        //                 </Avatar>
        //             </Link>
        //             <div className='flex items-center gap-3'>
        //                 <Link to={`/profile/${post?.author?._id}`}><h1 className="text-sm font-medium cursor-pointer">{post.author?.username}</h1></Link>
        //                 {user?._id === post.author._id && (
        //                     <Badge className="text-xs px-1 py-0.5 h-auto">Author</Badge>
        //                 )}
        //             </div>

        //         </div>
        //         <DialogDemo post={post} />
        //     </div>

        //     <img
        //         className='rounded-sm my-2 w-full aspect-square object-cover'
        //         src={post.image}
        //         alt="post_img"
        //     />

        //     <div className='flex items-center justify-between my-2'>
        //         <div className='flex items-center gap-3'>
        //             {
        //                 liked ? <FaHeart onClick={likeOrdislikeHandler} size={'24px'} className='cursor-pointer text-red-600' /> : <FaRegHeart onClick={likeOrdislikeHandler} size={'24px'} className='cursor-pointer hover:text-gray-600' />
        //             }

        //             <MessageCircle onClick={() => {
        //                 dispatch(setselectedPost(post))
        //                 setOpen(true)
        //             }} className='cursor-pointer hover:text-gray-600' />

        //             <Send className='cursor-pointer hover:text-gray-600' />
        //         </div>
        //         <Bookmark onClick={bookmarkHandler} className={`cursor-pointer transition-colors duration-200 ${isBookmarked ? 'text-gray-800 fill-gray-800' : 'text-gray-600'
        //             }`} />
        //     </div>
        //     <span className='font-medium block mb-2'>{postlike} likes</span>
        //     <p>
        //         <span className='font-medium mr-2'>{post.author.username}</span>
        //         {post.caption}
        //     </p>
        //     {
        //         comments.length > 0 && <span onClick={() => {
        //             dispatch(setselectedPost(post))
        //             setOpen(true)
        //         }} className='cursor-pointer text-sm text-gray-400' >View all {comments.length} comment</span>
        //     }
        //     <CommentDialog open={open} setOpen={setOpen} />
        //     <div className='flex items-center justify-between'>
        //         <input
        //             type="text"
        //             value={text}
        //             onChange={changeEventHandler}
        //             placeholder="Add a comment..."
        //             className='outline-none text-sm w-full bg-slate-100 rounded-md px-2'
        //         />
        //         {
        //             text && <span onClick={commmentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>
        //         }
        //     </div>

        // </div>

        <div className="my-6 w-full sm:max-w-md mx-auto p-2 bg-white rounded-md shadow-sm">
  {/* Post Header */}
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Link to={`/profile/${post?.author?._id}`}>
        <Avatar className="w-9 h-9 ring-2 ring-primary/50">
          <AvatarImage src={post?.author?.profilePicture} alt={post?.author?.username} />
          <AvatarFallback className="bg-primary text-white text-sm">
            {(post?.author?.username || 'U').slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex items-center gap-2">
        <Link to={`/profile/${post?.author?._id}`} className="text-sm font-medium">
          {post.author?.username}
        </Link>
        {user?._id === post.author._id && (
          <Badge className="text-xs px-1 py-0.5 h-auto">Author</Badge>
        )}
      </div>
    </div>
    <DialogDemo post={post} />
  </div>

  {/* Post Image */}
  <img
    className="rounded-sm my-2 w-full aspect-square object-cover"
    src={post.image}
    alt="post_img"
  />

  {/* Action Buttons */}
  <div className="flex items-center justify-between my-2">
    <div className="flex items-center gap-3">
      {liked ? (
        <FaHeart onClick={likeOrdislikeHandler} size={24} className="cursor-pointer text-red-600" />
      ) : (
        <FaRegHeart onClick={likeOrdislikeHandler} size={24} className="cursor-pointer hover:text-gray-600" />
      )}
      <MessageCircle
        onClick={() => { dispatch(setselectedPost(post)); setOpen(true); }}
        className="cursor-pointer hover:text-gray-600"
      />
      <Send className="cursor-pointer hover:text-gray-600" />
    </div>
    <Bookmark
      onClick={bookmarkHandler}
      className={`cursor-pointer transition-colors duration-200 ${isBookmarked ? 'text-gray-800 fill-gray-800' : 'text-gray-600'}`}
    />
  </div>

  {/* Likes and Caption */}
  <span className="font-medium block mb-2">{postlike} likes</span>
  <p>
    <span className="font-medium mr-2">{post.author.username}</span>
    {post.caption}
  </p>

  {/* Comments */}
  {comments.length > 0 && (
    <span
      onClick={() => { dispatch(setselectedPost(post)); setOpen(true); }}
      className="cursor-pointer text-sm text-gray-400"
    >
      View all {comments.length} comment{comments.length > 1 ? 's' : ''}
    </span>
  )}

  <CommentDialog open={open} setOpen={setOpen} />

  {/* Add Comment */}
  <div className="flex items-center gap-2 mt-2">
    <input
      type="text"
      value={text}
      onChange={changeEventHandler}
      placeholder="Add a comment..."
      className="outline-none text-sm w-full bg-slate-100 rounded-md px-2 py-1"
    />
    {text && <span onClick={commmentHandler} className="text-[#3BADF8] cursor-pointer">Post</span>}
  </div>
</div>

    )
}

export default Post