import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector(store => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture,
    bio: user?.bio,
    gender: user?.gender
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL=import.meta.env.VITE_API_URL

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilePhoto: file });
  }

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  }

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/v1/user/profile/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture,
          gender: res.data.user.gender
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messasge);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='flex max-w-2xl mx-auto px-6 sm:px-10'>
      <section className='flex flex-col gap-8 w-full py-10'>
        <h1 className='font-semibold text-2xl text-foreground'>Edit Profile</h1>

        <div className='flex items-center justify-between bg-muted rounded-xl px-5 py-4'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-12 w-12 ring-2 ring-primary/30">
              <AvatarImage src={user?.profilePicture} alt="profilephoto" />
              <AvatarFallback className="bg-primary text-white text-sm">
                {(user?.username || 'U')?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h2 className='font-medium text-sm'>{user?.username}</h2>
              <p className='text-xs text-muted-foreground'>
                {user?.bio || 'No bio available'}
              </p>
            </div>
          </div>
          <input ref={imageRef} onChange={fileChangeHandler} type='file' className='hidden' />
          <Button onClick={() => imageRef?.current.click()} className='h-8 px-4 text-xs font-semibold bg-primary hover:bg-primary/90'>
            Change Photo
          </Button>
        </div>

        <div className='space-y-2'>
          <h2 className='text-sm font-medium text-foreground'>Bio</h2>
          <Textarea
            placeholder="Tell something about yourself..."
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name='bio'
            className="focus-visible:ring-ring text-sm"
          />
        </div>

        <div className='space-y-2'>
          <h2 className='text-sm font-medium text-foreground'>Gender</h2>
          <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex justify-end'>
          {loading ? (
            <Button className='bg-primary hover:bg-primary/90 text-white px-6 py-2 text-sm'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className='bg-primary hover:bg-primary/90 text-white px-6 py-2 text-sm'
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

export default EditProfile