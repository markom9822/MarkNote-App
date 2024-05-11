import { selectedNoteAtom, renameNoteAtom } from "@renderer/store"
import { useAtomValue, useSetAtom } from "jotai"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"
import { formatDateFromMs} from '@renderer/utils'
import { NoteStatusDropdown } from "./NoteStatusDropdown"


export const EditorTitleBar = ({className, ...props}: ComponentProps<'div'>) => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const renameNote = useSetAtom(renameNoteAtom)

    const [titleToggle, setTitleToggle] = useState(true);
    const [newText, setNewText] = useState('');
    
    const handleClickSave = async() => {
        await renameNote(newText)
        setTitleToggle(true);
    }

    function handleClickCancel() {
        setTitleToggle(true);
    }
    
    function handleChange(event) {
        setNewText(event.target.value);
    }
    
    if(!selectedNote) return null
    
    function showInput() {
        if(selectedNote !== null)
        setNewText(selectedNote.title)
        setTitleToggle(false);
    }

    const date = formatDateFromMs(selectedNote.lastEditTime)

   return (
    <div className={twMerge('flex flex-col mx-4 my-2', className)} {...props}>
        <div>
            {titleToggle ? (
                <h1 onDoubleClick={showInput} className = "text-2xl text-gray-300">{selectedNote.title}</h1>
            ) : (
                <div>  
                    <input type="text" value={newText}  onChange={handleChange} className=" ps-1 text-2xl text-zinc-300 border border-zinc-400 rounded-md bg-zinc-600 focus:outline-none"/>
                    <button onClick={handleClickSave} className="px-2 py-1 rounded-md text-xs border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100">
                        Save
                    </button>
                    <button onClick={handleClickCancel} className="px-2 py-1 rounded-md text-xs border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100">
                        Cancel
                    </button>
                </div> 
            )}
        </div>
        <div className="flex space-x-3 items-center">
            <NoteStatusDropdown  />
            <div>
                <span className="inline-block text-xs font-light text-left text-zinc-400">{date}</span>
            </div>
        </div>
    </div>
   ) 
}
