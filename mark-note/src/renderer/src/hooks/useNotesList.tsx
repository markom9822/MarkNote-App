import { allNotesAtom, selectedNoteIndexAtom, selectedNoteAtom, filteredNotesAtom } from "@/store"
import { filter } from "@mdxeditor/editor"
import { NoteInfo } from "@shared/models"
import { useAtom, useAtomValue } from "jotai"


export const useNotesList = ({onSelect}: {onSelect?: () => void}) => {
    const selectedNote = useAtomValue(selectedNoteAtom)

    const allNotes = useAtomValue(allNotesAtom)
    const [filteredNotes, setFilteredNotes] = useAtom(filteredNotesAtom)

    const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

    const handleNotesSelect = (index: number | null) => async() => {     
        setSelectedNoteIndex(index)

        if(onSelect) {
            onSelect()
        }
    }

    const handleNotesFiltered = (query: string) => async() => { 

        console.info("Start of filtering notes")

        const filteredNotes = allNotes?.filter(note => {
            if(query === "")
            {
                return note
            }
            else if (note.title.toLowerCase().includes(query.toLowerCase())) {
                // return filtered array
                console.info(`Matching Title: ${note.title}`)
                return note
            }
            return null
            }).map((note) => {return note}) 

        console.info(`filtered note: ${filteredNotes}`)


        if(filteredNotes !== undefined)   
        setFilteredNotes(filteredNotes)
    }

    return {
        allNotes, 
        filteredNotes,
        selectedNoteIndex,
        handleNotesSelect,
        handleNotesFiltered
    }
}