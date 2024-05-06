import { selectedNoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { useState } from "react"
import { PreviewOptionsDropdown} from "@/components";

export const FloatingNoteTitle = ({className, ...props}: ComponentProps<'div'>) => {
    const selectedNote = useAtomValue(selectedNoteAtom)

    if(!selectedNote) return null

   return (
    <div className={twMerge('flex justify-between mx-4', className)} {...props}>
        <div className="">
            <PreviewOptionsDropdown />
        </div>
        
    </div>
   ) 
}

