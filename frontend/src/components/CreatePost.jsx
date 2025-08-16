
// import React from 'react'
// import { Dialog, DialogContent,DialogHeader } from './ui/dialog'
// import { useSelector } from 'react-redux'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Textarea } from './ui/textarea';
// import { useState,useRef } from 'react';
// import { Button } from './ui/button';
// import { readFileAsDataURL } from '@/lib/utils';
// import { Loader2 } from 'lucide-react';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useDispatch } from 'react-redux';
// import { setPosts } from '@/redux/postSlice';


// function CreatePost({open ,setOpen}) {

//     const {user}=useSelector(store=>store.auth)
//     const imageRef=useRef()
//     const [file, setFile] = useState("");
//     const [imagePreview, setImagePreview] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [caption, setCaption] = useState("");
//     const dispatch=useDispatch()
//     const { posts } = useSelector((store) => store.post);
//     const API_URL=import.meta.env.VITE_API_URL

//     const fileChangeHandler = async (e) => {
//         const file = e.target.files?.[0];
//         if (file){
//         setFile(file);
//         const dataUrl = await readFileAsDataURL(file);
//         setImagePreview(dataUrl);
//         }
//     }

//     const createPostHandler=async(e)=>{
//         e.preventDefault()
//         const formdata=new FormData()
//         formdata.append("caption",caption)
//         if (imagePreview) formdata.append("image", file);

//         try {
//             setLoading(true)
            
//             const res=await axios.post(`${API_URL}/api/v1/post/addpost`,formdata,{
//                 headers: {
//                 'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             })

//             if (res.data.success) {
//                 const updatedpost=[res.data.post, ...posts]
//                 dispatch(setPosts(updatedpost));
//                 toast.success(res.data.message);
//                 setOpen(false);
//             }

//         }catch (error) {
//            toast.error(error.response.data.message);
//         } finally {
//            setLoading(false);
//         }
//     }



//   return (
//     <Dialog open={open}>
//         <DialogContent onInteractOutside={() => setOpen(false)}>
//             <DialogHeader className='text-center font-semibold'>Create New Post</DialogHeader>
//                 <div className='flex gap-3 items-center'>
//                 <Avatar>
//                     <AvatarImage src={user?.profilePicture} alt="img" />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//                 <div>
//                     <h1 className='font-semibold text-xs'>{user?.username}</h1>
//                     <span className='text-gray-600 text-xs'>Bio here...</span>
//                 </div>
//                 </div>
//                 <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..." />
//                 {
//                 imagePreview && (
//                     <div className='w-full h-64 flex items-center justify-center'>
//                     <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
//                     </div>
//                 )
//                 }
//                 <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
//                 <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] '>Select from computer</Button>
//                 {
//                 imagePreview && (
//                     loading ? (
//                     <Button>
//                         <Loader2 className='mr-2 h-4 w-4 animate-spin' />
//                         Please wait
//                     </Button>
//                     ) : (
//                     <Button onClick={createPostHandler} type="submit" className="w-full">Post</Button>
//                     )
//                 )
//                 }
//         </DialogContent>
//     </Dialog>
//   )
// }

// export default CreatePost

import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts } from '@/redux/postSlice';

function CreatePost({ open, setOpen }) {
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const fileChangeHandler = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUrl = await readFileAsDataURL(selectedFile);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    if (!caption && !imagePreview) {
      toast.error("Please add a caption or select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/v1/post/addpost`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
        setCaption('');
        setImagePreview('');
        setFile(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="w-full max-w-md sm:max-w-lg rounded-lg p-4 sm:p-6"
      >
        <DialogHeader className="text-center font-semibold text-lg">
          Create New Post
        </DialogHeader>

        <div className="flex gap-3 items-center mb-3">
          <Avatar className="w-10 h-10 ring-2 ring-primary/30">
            <AvatarImage src={user?.profilePicture} alt="profile" />
            <AvatarFallback>{(user?.username || 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-medium text-sm">{user?.username}</h1>
            <span className="text-gray-500 text-xs">{user?.bio || 'Bio here...'}</span>
          </div>
        </div>

        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full mb-3 resize-none focus-visible:ring-primary"
        />

        {imagePreview && (
          <div className="w-full h-60 sm:h-64 mb-3 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="preview"
              className="object-contain h-full w-full rounded-md"
            />
          </div>
        )}

        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />

        <Button
          onClick={() => imageRef.current.click()}
          className="w-full mb-3 bg-[#0095F6] hover:bg-[#258bcf]"
        >
          Select from computer
        </Button>

        {loading ? (
          <Button disabled className="w-full flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button onClick={createPostHandler} className="w-full">
            Post
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreatePost;
