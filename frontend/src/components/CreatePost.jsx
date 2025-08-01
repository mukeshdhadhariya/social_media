
import React from 'react'
import { Dialog, DialogContent,DialogHeader } from './ui/dialog'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { useState,useRef } from 'react';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setPosts } from '@/redux/postSlice';


function CreatePost({open ,setOpen}) {

    const {user}=useSelector(store=>store.auth)
    const imageRef=useRef()
    const [file, setFile] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("");
    const dispatch=useDispatch()
    const { posts } = useSelector((store) => store.post);
    const API_URL=import.meta.env.VITE_API_URL

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file){
        setFile(file);
        const dataUrl = await readFileAsDataURL(file);
        setImagePreview(dataUrl);
        }
    }

    const createPostHandler=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("caption",caption)
        if (imagePreview) formdata.append("image", file);

        try {
            setLoading(true)
            
            const res=await axios.post(`${API_URL}/api/v1/post/addpost`,formdata,{
                headers: {
                'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })

            if (res.data.success) {
                const updatedpost=[res.data.post, ...posts]
                dispatch(setPosts(updatedpost));
                toast.success(res.data.message);
                setOpen(false);
            }

        }catch (error) {
           toast.error(error.response.data.message);
        } finally {
           setLoading(false);
        }
    }



  return (
    <Dialog open={open}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
            <DialogHeader className='text-center font-semibold'>Create New Post</DialogHeader>
                <div className='flex gap-3 items-center'>
                <Avatar>
                    <AvatarImage src={user?.profilePicture} alt="img" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className='font-semibold text-xs'>{user?.username}</h1>
                    <span className='text-gray-600 text-xs'>Bio here...</span>
                </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
                {
                imagePreview && (
                    <div className='w-full h-64 flex items-center justify-center'>
                    <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
                    </div>
                )
                }
                <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
                <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>
                {
                imagePreview && (
                    loading ? (
                    <Button>
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        Please wait
                    </Button>
                    ) : (
                    <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
                    )
                )
                }
        </DialogContent>
    </Dialog>
  )
}

export default CreatePost