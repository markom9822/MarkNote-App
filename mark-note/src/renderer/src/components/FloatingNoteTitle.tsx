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
    <div className={twMerge('flex justify-center py-[43px] bg-bkgPrimary border-b border-borderPrimary/70', className)} {...props}>
        <span className="text-xl text-textPrimary/50">Note Preview</span>
        
    </div>
   ) 
}

