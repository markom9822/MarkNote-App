import { filteredNotesAtom, selectedNoteAtom, selectedNoteIndexAtom } from "@renderer/store"
import { useAtomValue, useAtom } from "jotai"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"
import { formatDateFromMs, cn} from '@renderer/utils'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { DeleteNoteButton} from "@/components"



export const EditorTopBar = ({className, ...props}: ComponentProps<'div'>) => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

    const filteredNotes = useAtomValue(filteredNotesAtom)


    if(!selectedNote) return null
    if(!filteredNotes) return null

    const date = formatDateFromMs(selectedNote.lastEditTime)
    console.info(selectedNoteIndex)

    const handleClickRightArrow = () => {
        if(selectedNoteIndex == 0) return
        if (selectedNoteIndex == null) return
        
        setSelectedNoteIndex(selectedNoteIndex - 1)
    }

    const handleClickLeftArrow = () => {
        if(selectedNoteIndex == filteredNotes.length-1) return
        if (selectedNoteIndex == null) return
        
        setSelectedNoteIndex(selectedNoteIndex + 1)
    }

   return (
    <div className={twMerge('relative', className)} {...props}>
        <div className="flex space-x-1 items-center">
            <div className="flex space-x-3 mx-3">
                <EditorNavButton isActive={selectedNoteIndex !== filteredNotes.length-1}>
                    <button onClick={handleClickLeftArrow} className="my-2"><RiArrowLeftSLine className="w-5 h-5"/></button>
                </EditorNavButton>
                <EditorNavButton isActive={selectedNoteIndex !== 0}>
                    <button onClick={handleClickRightArrow} className="my-2"><RiArrowRightSLine className="w-5 h-5"/></button>
                </EditorNavButton>
            </div>
            <p className="text-xs font-light text-left text-zinc-400">{date}</p> 
            <DeleteNoteButton className="absolute right-0"/> 
        </div>
    </div>
   ) 
}

export type EditorNavButtonProps = ComponentProps<'button'> & {
    isActive?: boolean
} 

export const EditorNavButton = ({isActive, className, children, ...props}: EditorNavButtonProps) => {
    return <button className={cn('text-zinc-200 rounded-md cursor-pointer transition-colors duration-100', 
    {
        'hover:text-zinc-100 text-zinc-300': isActive,
        'text-zinc-500': !isActive,
    },
    className
    )} {...props}
    >
        {children}
    </button>
}