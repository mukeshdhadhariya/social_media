// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams, Link } from 'react-router-dom'
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { AtSign, Heart, MessageCircle } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { useState } from 'react';
// import { getRandomColor } from '@/hooks/rendomColorGenrator';
// import { toast } from 'sonner';
// import axios from 'axios';
// import { setAuthUser, setuserprofile } from '@/redux/authSlice';
// import useGetuserprofile from '@/hooks/useGetuserprofile';

// function Profile() {
//   const colorx = getRandomColor();
//   const params = useParams()
//   const userId = params.id
//   useGetuserprofile(userId)

//   const dispatch = useDispatch()

//   const [activeTab, setActiveTab] = useState('posts');

//   const { userprofile, user } = useSelector(store => store.auth)
//   const isLoggedInuserprofile = user?._id === userprofile?._id;
//   const [isFollowing, setIsfollowing] = useState(user?.following?.some(id => id.toString() === userId.toString()))
//   const API_URL=import.meta.env.VITE_API_URL
  

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   }

//   const displayedPost = activeTab === 'posts' ? userprofile?.posts : userprofile?.bookmarks;


//   // const FollowUnfollowHandler = async () => {
//   //   try {
//   //     const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${userId}`, {}, {
//   //       withCredentials: true
//   //     })

//   //     if (res.data.success) {
//   //       toast.success(res.data.message)
//   //       dispatch(setAuthUser({
//   //         ...user,
//   //         following: isFollowing
//   //           ? user.following.filter(id => String(id) !== String(userId))
//   //           : [...user.following, userId]
//   //       }));

//   //       const updatedFollowers = isFollowing
//   //         ? userprofile.followers.filter(id => String(id) !== String(user._id))
//   //         : [...userprofile.followers, user._id];

//   //       dispatch(setuserprofile({
//   //         ...userprofile,
//   //         followers: updatedFollowers
//   //       }));

//   //       setIsfollowing(!isFollowing)
//   //     }
//   //   } catch (error) {
//   //     toast.error("follow unfollow error ")
//   //   }
//   // }

//   const FollowUnfollowHandler = async () => {
//     try {
//       const res = await axios.post(
//         `${API_URL}/api/v1/user/followorunfollow/${userId}`,
//         {},
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);

//         const updatedFollowing = isFollowing
//           ? user.following.filter(id => id !== userId)
//           : [...user.following, userId];

//         dispatch(setAuthUser({
//           ...user,
//           following: updatedFollowing
//         }));

//         // Important: deep clone userprofile so Redux triggers a re-render
//         const updatedUserProfile = {
//           ...userprofile,
//           followers: isFollowing
//             ? userprofile.followers.filter(id => id !== user._id)
//             : [...userprofile.followers, user._id],
//         };

//         dispatch(setuserprofile(updatedUserProfile));
//         setIsfollowing(!isFollowing);
//       }
//     } catch (error) {
//       console.error("Follow/unfollow error", error);
//       toast.error("Follow/unfollow error");
//     }
//   };



//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4">
//       <div className="flex flex-col gap-10">

//         <div className="flex items-center gap-16">
//           {/* Profile Image */}
//           <div className="flex justify-center items-center w-1/3">
//             <Avatar className="h-36 w-36">
//               <AvatarImage src={userprofile?.profilePicture} alt="profilephoto" />
//               <AvatarFallback style={{ backgroundColor: colorx }} >{(userprofile?.username || 'U')?.slice(0, 2).toUpperCase()}</AvatarFallback>
//             </Avatar>
//           </div>

//           {/* Profile Details */}
//           <div className="flex flex-col gap-4 w-2/3">
//             {/* Username + Buttons */}
//             <div className="flex items-center gap-4">
//               <span className="text-xl font-light">{userprofile?.username}</span>

//               {isLoggedInuserprofile ? (
//                 <>
//                   <Link to="/account/edit">
//                     <Button variant="secondary" className="h-8 text-sm px-4">Edit Profile</Button>
//                   </Link>
//                   <Button variant="secondary" className="h-8 text-sm px-4">View Archive</Button>
//                   <Button variant="secondary" className="h-8 text-sm px-4">Ad Tools</Button>
//                 </>
//               ) : isFollowing ? (
//                 <>
//                   <Button onClick={FollowUnfollowHandler} variant="secondary" className="h-8 text-sm px-4">Unfollow</Button>
//                   <Button variant="secondary" className="h-8 text-sm px-4">Message</Button>
//                 </>
//               ) : (
//                 <Button onClick={FollowUnfollowHandler} className="h-8 text-sm px-6 bg-[#0095F6] hover:bg-[#318ce7] text-white">Follow</Button>
//               )}
//             </div>

//             {/* Stats */}
//             <div className="flex gap-8 text-sm">
//               <span><strong>{userprofile?.posts.length}</strong> posts</span>
//               <span><strong>{userprofile?.followers.length}</strong> followers</span>
//               <span><strong>{userprofile?.following.length}</strong> following</span>
//             </div>

//             {/* Bio */}
//             <div className="flex flex-col gap-1 text-sm">
//               <span className="font-semibold">{userprofile?.bio || "bio here..."}</span>
//               <Badge className="w-fit" variant="secondary"><AtSign /> <span className="pl-1">{userprofile?.username}</span></Badge>
//               <span>🤯 Learn code with patel mernstack style</span>
//               <span>🤯 Turning code into fun</span>
//               <span>🤯 DM for collaboration</span>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-300 mt-4">
//           <div className="flex items-center justify-center gap-10 text-xs font-medium tracking-wide text-gray-600">
//             <span
//               className={`flex items-center gap-1 py-4 cursor-pointer ${activeTab === 'posts' ? 'text-black border-t-2 border-black font-semibold' : ''}`}
//               onClick={() => handleTabChange('posts')}
//             >
//               POSTS
//             </span>
//             {
//               user?._id && (userId === user?._id) && (<span
//                 className={`flex items-center gap-1 py-4 cursor-pointer ${activeTab === 'saved' ? 'text-black border-t-2 border-black font-semibold' : ''}`}
//                 onClick={() => handleTabChange('saved')}
//               >
//                 SAVED
//               </span>)
//             }
//             <span className="py-4 cursor-pointer">REELS</span>
//             <span className="py-4 cursor-pointer">TAGS</span>
//           </div>
//         </div>


//         <div className="grid grid-cols-3 gap-1">
//           {Array.isArray(displayedPost) &&
//             displayedPost.map((post) => (
//               <div key={post?._id} className="relative group cursor-pointer">
//                 <img
//                   src={post.image}
//                   alt="postimage"
//                   className="rounded-sm w-full aspect-square object-cover"
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="flex items-center text-white space-x-4">
//                     <button className="flex items-center gap-2 hover:text-gray-300">
//                       <Heart />
//                       <span>{post?.likes?.length || 0}</span>
//                     </button>
//                     <button className="flex items-center gap-2 hover:text-gray-300">
//                       <MessageCircle />
//                       <span>{post?.comments?.length || 0}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>


//       </div>
//     </div>

//   )
// }

// export default Profile



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { setAuthUser, setuserprofile } from '@/redux/authSlice';
import useGetuserprofile from '@/hooks/useGetuserprofile';
import { getRandomColor } from '@/hooks/rendomColorGenrator';

function Profile() {
  const colorx = getRandomColor();
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;

  const [activeTab, setActiveTab] = useState('posts');
  const { userprofile, user } = useSelector(store => store.auth);
  const isLoggedInuserprofile = user?._id === userprofile?._id;
  const [isFollowing, setIsfollowing] = useState(
    user?.following?.some(id => id.toString() === userId.toString())
  );

  useGetuserprofile(userId);

  const handleTabChange = (tab) => setActiveTab(tab);
  const displayedPost = activeTab === 'posts' ? userprofile?.posts : userprofile?.bookmarks;

  const FollowUnfollowHandler = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/user/followorunfollow/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const updatedFollowing = isFollowing
          ? user.following.filter(id => id !== userId)
          : [...user.following, userId];

        dispatch(setAuthUser({ ...user, following: updatedFollowing }));

        const updatedUserProfile = {
          ...userprofile,
          followers: isFollowing
            ? userprofile.followers.filter(id => id !== user._id)
            : [...userprofile.followers, user._id],
        };

        dispatch(setuserprofile(updatedUserProfile));
        setIsfollowing(!isFollowing);
      }
    } catch (error) {
      console.error("Follow/unfollow error", error);
      toast.error("Follow/unfollow error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16">
        {/* Profile Image */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Avatar className="h-28 w-28 md:h-36 md:w-36">
            <AvatarImage src={userprofile?.profilePicture} alt="profilephoto" />
            <AvatarFallback style={{ backgroundColor: colorx }}>
              {(userprofile?.username || 'U')?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          {/* Username + Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <span className="text-lg md:text-xl font-light">{userprofile?.username}</span>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {isLoggedInuserprofile ? (
                <>
                  <Link to="/account/edit">
                    <Button variant="secondary" className="h-8 text-sm px-4">Edit Profile</Button>
                  </Link>
                  <Button variant="secondary" className="h-8 text-sm px-4">View Archive</Button>
                  <Button variant="secondary" className="h-8 text-sm px-4">Ad Tools</Button>
                </>
              ) : isFollowing ? (
                <>
                  <Button onClick={FollowUnfollowHandler} variant="secondary" className="h-8 text-sm px-4">Unfollow</Button>
                  <Link  to='/chat' variant="secondary" className="h-8 text-sm px-4">Message</Link>
                </>
              ) : (
                <Button onClick={FollowUnfollowHandler} className="h-8 text-sm px-6 bg-[#0095F6] hover:bg-[#318ce7] text-white">Follow</Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
            <span><strong>{userprofile?.posts.length}</strong> posts</span>
            <span><strong>{userprofile?.followers.length}</strong> followers</span>
            <span><strong>{userprofile?.following.length}</strong> following</span>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1 text-sm">
            <span className="font-semibold">{userprofile?.bio || "bio here..."}</span>
            <Badge className="w-fit mx-auto md:mx-0" variant="secondary">
              <AtSign /> <span className="pl-1">{userprofile?.username}</span>
            </Badge>
            <span>tell me about yourself</span>
            <span>Turning code into fun</span>
            <span>DM for collaboration</span>
          </div>
        </div>
      </div>


      {/* Tabs */}
      <div className="border-t border-gray-300 mt-6">
        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs font-medium tracking-wide text-gray-600">
          <span
            className={`flex items-center gap-1 py-3 cursor-pointer ${activeTab === 'posts' ? 'text-black border-t-2 border-black font-semibold' : ''}`}
            onClick={() => handleTabChange('posts')}
          >
            POSTS
          </span>
          {user?._id === userId && (
            <span
              className={`flex items-center gap-1 py-3 cursor-pointer ${activeTab === 'saved' ? 'text-black border-t-2 border-black font-semibold' : ''}`}
              onClick={() => handleTabChange('saved')}
            >
              SAVED
            </span>
          )}
          <span className="py-3 cursor-pointer">REELS</span>
          <span className="py-3 cursor-pointer">TAGS</span>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-1 mt-4">
        {Array.isArray(displayedPost) &&
          displayedPost.map((post) => (
            <div key={post?._id} className="relative group cursor-pointer">
              <img
                src={post.image}
                alt="postimage"
                className="rounded-sm w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-white space-x-4">
                  <button className="flex items-center gap-2 hover:text-gray-300">
                    <Heart /> <span>{post?.likes?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-gray-300">
                    <MessageCircle /> <span>{post?.comments?.length || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Profile;
