import { cn } from "@renderer/utils"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"

export const HeadingHelperButton = ({className, children, ...props}: ComponentProps<'button'>) => {
    return <button className={cn('cursor-pointer border border-zinc-900 rounded-md hover:border-indigo-500 px-2 py-1', className
    )} {...props}
    >
        {children}
    </button>
}

