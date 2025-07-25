import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ cmt }) => {
    return (
        <div className="my-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-5 py-3 shadow-sm">
            <div className="flex items-start gap-4">
                <Avatar className="w-11 h-11 ring-2 ring-primary/60">
                    <AvatarImage
                        src={cmt?.author?.profilePicture}
                        alt={cmt?.author?.username}
                    />
                    <AvatarFallback className="bg-primary text-white">
                        {(cmt?.author?.username || 'U')?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">
                            {cmt?.author?.username}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            • Just now
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">
                        {cmt?.text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Comment

