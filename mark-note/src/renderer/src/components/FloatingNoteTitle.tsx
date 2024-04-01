import { selectedNoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { PreviewOptionsButton } from "./Button"
import { useState } from "react"
import { PreviewOptionsPopUpModal} from "@/components";

export const FloatingNoteTitle = ({className, ...props}: ComponentProps<'div'>) => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const [showPreviewOptions, setShowPreviewOptions] = useState(false)
    const handlePreviewOptionsOnClose = () => setShowPreviewOptions(false)

    if(!selectedNote) return null

   return (
    <div className={twMerge('flex justify-between mx-7', className)} {...props}>
        <span className = "text-gray-300">{selectedNote.title}</span>
        <div className="flex flex col">
            <PreviewOptionsButton onClick={() => setShowPreviewOptions(true)}/>
            <PreviewOptionsPopUpModal onClose={handlePreviewOptionsOnClose} visible={showPreviewOptions}/>
        </div>
        
    </div>
   ) 
}

