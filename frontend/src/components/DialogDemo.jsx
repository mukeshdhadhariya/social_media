import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"

import { MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { useState } from "react"
import { setPosts } from "@/redux/postSlice"



export function DialogDemo({ post }) {
  const { user } = useSelector(store => store.auth)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const { posts } = useSelector(store => store.post)
  const API_URL=import.meta.env.VITE_API_URL

  const postdeleteHandler = async () => {
    try {
      const res = await axios.delete(`${API_URL}/api/v1/post/delete/${post._id}`, { withCredentials: true })
      if (res.data.success) {
        const updatedpost = posts.filter((postitem) => postitem?._id !== post?._id)
        dispatch(setPosts(updatedpost))
        toast.success(res.data.message)
        setOpen(false)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MoreHorizontal className='cursor-pointer text-muted-foreground hover:text-foreground transition' />
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm rounded-xl p-0 overflow-hidden">
        <div className="flex flex-col text-sm divide-y">
          {user && user?._id !== post?.author._id && (
            <Button
              variant="ghost"
              className="text-[#f93743] font-semibold py-4 hover:bg-muted/40 rounded-none"
            >
              Unfollow
            </Button>
          )}

          <Button
            variant="ghost"
            className="py-4 hover:bg-muted/40 rounded-none"
          >
            Add to favorites
          </Button>

          {user && user?._id === post?.author._id && (
            <Button
              onClick={postdeleteHandler}
              variant="ghost"
              className="py-4 hover:bg-muted/40 rounded-none"
            >
              Delete
            </Button>
          )}

          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            className="py-4 text-blue-500 hover:bg-muted/40 rounded-none"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  )
}
