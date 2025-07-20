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

import { MoreHorizontal } from 'lucide-react'


export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className='cursor-pointer' />
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center text-sm text-center">
        <DialogTitle>something new</DialogTitle>
        <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
        <Button variant='ghost' className="cursor-pointer w-fit">Add to favorites</Button>
        <Button variant='ghost' className="cursor-pointer w-fit">Delete</Button>
      </DialogContent>
    </Dialog>
  )
}
