import { cn } from "@renderer/utils"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"

export const HeadingHelperButton = ({className, children, ...props}: ComponentProps<'button'>) => {
    return <button className={cn('cursor-pointer rounded-md hover:bg-zinc-500/75 px-2 py-1', className
    )} {...props}
    >
        {children}
    </button>
}