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
    <div className={twMerge('flex justify-center py-11 bg-zinc-900 border-b border-zinc-600', className)} {...props}>
        <span className="text-xl text-zinc-600">Note Preview</span>
        
    </div>
   ) 
}

