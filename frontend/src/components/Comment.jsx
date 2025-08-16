// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

// const Comment = ({ cmt }) => {
//     return (
//         <div className="my-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-5 py-3 shadow-sm">
//             <div className="flex items-start gap-4">
//                 <Avatar className="w-11 h-11 ring-2 ring-primary/60">
//                     <AvatarImage
//                         src={cmt?.author?.profilePicture}
//                         alt={cmt?.author?.username}
//                     />
//                     <AvatarFallback className="bg-primary text-white">
//                         {(cmt?.author?.username || 'U')?.slice(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                 </Avatar>

//                 <div className="flex flex-col">
//                     <div className="flex items-center gap-2">
//                         <span className="text-base font-semibold text-foreground">
//                             {cmt?.author?.username}
//                         </span>
//                         <span className="text-xs text-muted-foreground">
//                             • Just now
//                         </span>
//                     </div>
//                     <p className="text-sm text-muted-foreground mt-1 leading-snug">
//                         {cmt?.text}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Comment



import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import Comment from './Comment';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '@/redux/postSlice';
import axios from 'axios';
import { toast } from 'sonner';

function CommentDialog({ open, setOpen }) {
  const { selectedPost, posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [comment, setComment] = useState(selectedPost?.comments || []);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (selectedPost) setComment(selectedPost.comments || []);
  }, [selectedPost]);

  const changeEventHandler = (e) => setText(e.target.value);

  const commmentHandler = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/v1/post/${selectedPost._id}/comment`,
        { text },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        setText('');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to post comment');
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="w-full max-w-4xl sm:h-[80vh] flex flex-col sm:flex-row p-0 overflow-hidden rounded-lg"
      >
        {/* Post Image */}
        <div className="w-full sm:w-1/2 h-64 sm:h-auto">
          <img
            src={selectedPost?.image}
            alt="post"
            className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          />
        </div>

        {/* Comments Section */}
        <div className="w-full sm:w-1/2 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${selectedPost?.author._id}`}>
                <Avatar>
                  <AvatarImage src={selectedPost?.author.profilePicture} />
                  <AvatarFallback>{(selectedPost?.author.username || 'U').slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Link>
              <Link to={`/profile/${selectedPost?.author._id}`} className="font-semibold text-sm">
                {selectedPost?.author.username}
              </Link>
            </div>
            <MoreHorizontal className="cursor-pointer" />
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {comment.length > 0 ? (
              comment.map((cmt) => <Comment key={cmt._id} cmt={cmt} />)
            ) : (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            )}
          </div>

          {/* Add Comment */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={text}
              onChange={changeEventHandler}
              placeholder="Add a comment..."
              className="flex-1 border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <Button onClick={commmentHandler} disabled={!text.trim()} className="flex-shrink-0">
              Send
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
