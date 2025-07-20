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

function CommentDialog({open,setOpen}) {

  const [text,setText]=useState("")

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler=async()=>{
    alert("hello")
  }

  return (
        <Dialog open={open}>
            <DialogContent className="max-w-5xl p-0 flex flex-col" onInteractOutside={()=>setOpen(false)} >
              <div className='flex flex-1'>

                  <div className='w-1/2'>
                    <img 
                      src="https://www.thefamouspeople.com/profiles/images/maharana-pratap-4.jpg"
                      alt="" 
                      className='w-full h-full object-cover rounded-l-lg'
                    />
                  </div>

                    <div className='w-1/2 flex flex-col justify-between'>
                      <div className='flex items-center justify-between p-4'>
                      <div className='flex gap-3 items-center'>
                        <Link>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div>
                          <Link className='font-semibold text-xs'>username</Link>
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
                      yaha comment karo
                    </div>

                    <div className='p-4'>
                      <div className='flex items-center gap-2'>
                        <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border text-sm border-gray-300 p-2 rounded' />
                        <Button disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
                      </div>
                    </div>

                    </div>
              </div>
            </DialogContent>
        </Dialog>
  )
}

export default CommentDialog