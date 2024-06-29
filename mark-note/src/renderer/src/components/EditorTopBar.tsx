import { filteredNotesAtom, selectedNoteAtom, selectedNoteIndexAtom } from "@renderer/store"
import { useAtomValue, useAtom } from "jotai"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"
import { formatDateFromMs, cn} from '@renderer/utils'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineTimer } from "react-icons/md";
import { DeleteNoteButton} from "@/components"


export const EditorTopBar = ({className, ...props}: ComponentProps<'div'>) => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

    const filteredNotes = useAtomValue(filteredNotesAtom)

    if(!selectedNote) return null
    if(!filteredNotes) return null

    const date = formatDateFromMs(selectedNote.lastEditTime)

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
                <EditorNavButton isActive={selectedNoteIndex !== filteredNotes.length-1}
                    onClick={handleClickLeftArrow} className="my-2" >
                    <RiArrowLeftSLine className="w-5 h-5"/>
                </EditorNavButton>
                <EditorNavButton isActive={selectedNoteIndex !== 0}
                    onClick={handleClickRightArrow} className="my-2" >
                    <RiArrowRightSLine className="w-5 h-5"/>
                </EditorNavButton>
            </div>
            <div className="flex space-x-2">
                <MdOutlineTimer className="w-3.5 h-3.5 text-iconPrimary" />
                <p className="text-xs font-light text-left text-zinc-400">{date}</p> 
                <DeleteNoteButton className="absolute right-0"/> 
            </div>
        </div>
    </div>
   ) 
}

export type EditorNavButtonProps = ComponentProps<'button'> & {
    isActive?: boolean
} 

export const EditorNavButton = ({isActive, className, children, ...props}: EditorNavButtonProps) => {
    return <button className={cn('text-zinc-200 rounded-md cursor-pointer transition-colors duration-100 focus:outline focus:outline-indigo-500', 
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