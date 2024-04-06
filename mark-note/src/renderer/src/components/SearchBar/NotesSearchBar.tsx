import { useNotesList } from "@renderer/hooks/useNotesList"
import { ComponentProps, useState, useEffect, useCallback } from "react"
import { notesAtom} from "@/store"
import { useSetAtom } from "jotai"
import { NoteInfo } from "@shared/models"



export type NoteSearchBarProps = ComponentProps<'div'> & {
    onSelect?: () => void,
}


export const NotesSearchBar = ({onSelect, onChange, ...props}: NoteSearchBarProps) => {
    const {notes} = useNotesList({onSelect})
    const [query, setQuery] = useState("")

    /*useEffect(() => {

        const filteredNotes = notes?.filter(note =>{
            if (note.title.toLowerCase().includes(query.toLowerCase())) {
                // return filtered array
                console.info(`Matching Title: ${note.title}`)
                return note
            }
            return null
        }).map((note) => {
            
            return note
        })

        if(filteredNotes !== undefined)
        handleNotesChange(filteredNotes)

      }, [query]);*/


    return (
        <div {...props}>
    <input type="search" id="notes-search" className="w-full p-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
    placeholder="Search Notes" onChange={event => setQuery(event.target.value)}/>
    </div>
    )
}