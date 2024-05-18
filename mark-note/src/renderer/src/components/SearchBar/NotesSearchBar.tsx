import { useNotesList } from "@renderer/hooks/useNotesList"
import { ComponentProps, useState, useEffect, useCallback } from "react"
import { FaFilter } from "react-icons/fa";


export type NoteSearchBarProps = ComponentProps<'div'> & {
    onSelect?: () => void,
}

export const NotesSearchBar = ({onSelect, onChange, ...props}: NoteSearchBarProps) => {
    const [query, setQuery] = useState("")
    const {allNotes, handleNotesFiltered, handleNotesSelect} = useNotesList({onSelect})

    return (
        <div {...props} className="relative flex justify-center">
            <div className="absolute left-4 inset-y-0 flex items-center">
                <FaFilter className="w-2.5 h-2.5 text-zinc-200" />
            </div>
            <input type="search" id="notes-search" className="p-1.5 ps-8 text-sm text-zinc-300 border border-zinc-600 rounded-md bg-zinc-600 
            focus:outline-none" 
            placeholder="Filter" onChange={event => setQuery(event.target.value)} onKeyUp={handleNotesFiltered(query)} onClick={handleNotesSelect(null)}/>
    </div>
    )
}