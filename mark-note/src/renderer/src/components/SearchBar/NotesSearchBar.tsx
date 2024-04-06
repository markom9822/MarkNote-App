import { useNotesList } from "@renderer/hooks/useNotesList"
import { ComponentProps, useState, useEffect, useCallback } from "react"
import { allNotesAtom} from "@/store"
import { useSetAtom } from "jotai"
import { NoteInfo } from "@shared/models"

export type NoteSearchBarProps = ComponentProps<'div'> & {
    onSelect?: () => void,
}

export const NotesSearchBar = ({onSelect, onChange, ...props}: NoteSearchBarProps) => {
    const [query, setQuery] = useState("")
    const {allNotes, handleNotesFiltered, handleNotesSelect} = useNotesList({onSelect})

    return (
        <div {...props}>
    <input type="search" id="notes-search" className="w-full p-2 ps-3 text-sm text-zinc-300 border border-zinc-600 rounded-md bg-zinc-600 focus:outline-none" 
    placeholder="Search" onChange={event => setQuery(event.target.value)} onKeyUp={handleNotesFiltered(query)} onClick={handleNotesSelect(null)}/>
    </div>
    )
}