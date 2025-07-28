import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import { setPosts } from '@/redux/postSlice'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

function CommentDialog({open,setOpen}) {

  const [text,setText]=useState("")
  const {selectedPost,posts}=useSelector(store=>store.post)
  const [comment, setComment] = useState(selectedPost?.comments);
  const dispatch = useDispatch();
  const API_URL=import.meta.env.VITE_API_URL

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const commmentHandler=async()=>{
      try {
          const res=await axios.post(`${API_URL}/api/v1/post/${selectedPost._id}/comment`,{text},
              {
              headers:{
                  'Content-Type':'application/json'
              },
              withCredentials:true
          })
          if(res.data.success){

              const updatedCommentData = [...comment, res.data.comment];
              setComment(updatedCommentData);

              const updatedPostData = posts.map(p =>
                  p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
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

  return (
        <Dialog open={open}>
            <DialogContent className="max-w-5xl p-0 flex flex-col" onInteractOutside={()=>setOpen(false)} >
              <div className='flex flex-1'>

                  <div className='w-1/2'>
                    <img 
                      src={selectedPost?.image}
                      alt="" 
                      className='w-full h-full object-cover rounded-l-lg'
                    />
                  </div>

                    <div className='w-1/2 flex flex-col justify-between'>
                      <div className='flex items-center justify-between p-4'>
                      <div className='flex gap-3 items-center'>
                        <Link>
                          <Avatar>
                            <AvatarImage src={selectedPost?.author.profilePicture} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div>
                          <Link className='font-semibold text-xs'>{selectedPost?.author.username}</Link>
                        </div>
                       </div>

                        <Dialog>
                        <DialogTrigger asChild>
                          <MoreHorizontal className='cursor-pointer' />
                        </DialogTrigger>
                        <DialogContent className="flex flex-col items-center text-sm text-center">
                          <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                            Unfollow
                          </div>
                          <div className='cursor-pointer w-full'>
                            Add to favorites
                          </div>
                        </DialogContent>
                        </Dialog>
                      </div>
                      <hr />
                    <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                      comment...
                      {Array.isArray(selectedPost?.comments) && selectedPost.comments.length > 0 ? (
                        comment.map((cmt) =>
                          <Comment key={cmt._id} cmt={cmt}/>
                        )
                      ) : (
                        <p>No posts available</p>
                      )}
                    </div>

                    <div className='p-4'>
                      <div className='flex items-center gap-2'>
                        <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
                        <Button disabled={!text.trim()} onClick={commmentHandler} variant="outline">Send</Button>
                      </div>
                    </div>

                    </div>
              </div>
            </DialogContent>
        </Dialog>
  )
}

export default CommentDialog