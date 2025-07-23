import React, { useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { DialogDemo } from './DialogDemo'
import { FaHeart,FaRegHeart } from "react-icons/fa";
import { Input } from 'postcss'
import CommentDialog from './CommentDialog'

function Post({post}) {

    const [text,setText]=useState("");

    const [open,setOpen]=useState(false)

    const changeEventHandler=(e)=>{
        const inputText=e.target.value
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText("")
        }
    }

  return (
    <div className='my-8 w-full mx-auto max-w-sm '>
        <div className='flex justify-between items-center'>
            <div className='flex gap-4 items-center'>
                <Avatar className='w-7 h-7'>
                <AvatarImage src={post.author.profilePicture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1>{post.author.username}</h1>
            </div>
            <DialogDemo/>
        </div>
        <img
            className='rounded-sm my-2 w-full aspect-square object-cover'
            src={post.image}
            alt="post_img"
        />
        
        <div className='flex items-center justify-between my-2'>
            <div className='flex items-center gap-3'>
                <FaHeart size={'24px'} className='cursor-pointer text-red-600 hover:text-red-500'/>
                <MessageCircle onClick={()=>setOpen(true)} className='cursor-pointer hover:text-gray-600' />
                <Send className='cursor-pointer hover:text-gray-600'/>
            </div>
            <Bookmark className='cursor-pointer hover:text-gray-600' />
        </div>
        <span className='font-medium block mb-2'>{post.likes}</span>
        <p>
            <span className='font-medium mr-2'>{post.author.username}</span>
            {post.caption}
        </p>
        <span onClick={()=>setOpen(true)}className='cursor-pointer text-sm text-gray-400' >View all comment</span>
        <CommentDialog open={open} setOpen={setOpen}/>
        <div className='flex items-center justify-between'>
            <input
            type="text"
            value={text}
            onChange={changeEventHandler}
            placeholder="Add a comment..."
            className='outline-none text-sm w-full bg-slate-100 rounded-md px-2'
            />
            {
                text && <span className='text-[#3BADF8] cursor-pointer'>Post</span>
            }
        </div>

    </div>
  )
}

export default Post