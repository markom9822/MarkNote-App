import { selectedNoteAtom, renameNoteAtom } from "@renderer/store"
import { useAtomValue, useSetAtom } from "jotai"
import { ComponentProps, useState} from "react"
import { twMerge } from "tailwind-merge"
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

   return (
    <div className={twMerge('flex flex-col mx-4 my-2', className)} {...props}>
        <div>
            {titleToggle ? (
                <h1 onDoubleClick={showInput} className = "text-2xl border-2 rounded border-bkgSecondary text-textSecondary hover:border-indigo-500/20">{selectedNote.title}</h1>
            ) : (
                <div>  
                    <input type="text" value={newText}  onChange={handleChange} className=" ps-1 mx-1 text-2xl text-textSecondary border border-indigo-400 rounded-md bg-bkgSecondary focus:outline-none"/>
                    <button onClick={handleClickSave} className="px-2 py-1 rounded-md text-xs bg-indigo-500 border border-zinc-400/50 hover:bg-indigo-600 transition-colors duration-100">
                        Save
                    </button>
                    <button onClick={handleClickCancel} className="px-2 py-1 rounded-md text-xs text-textSecondary border border-zinc-400/50 hover:bg-zinc-500/50 transition-colors duration-100">
                        Cancel
                    </button>
                </div> 
            )}
        </div>
        <div className="flex space-x-3 items-center">
            <NoteStatusDropdown />
        </div>   
    </div>
   ) 
}