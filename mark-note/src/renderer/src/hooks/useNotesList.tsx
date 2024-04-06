import { notesAtom, selectedNoteIndexAtom, selectedNoteAtom } from "@/store"
import { NoteInfo } from "@shared/models"
import { useAtom, useAtomValue } from "jotai"


export const useNotesList = ({onSelect}: {onSelect?: () => void}) => {
    const selectedNote = useAtomValue(selectedNoteAtom)

    //const notes = useAtomValue(notesAtom)
    const [notes, setNotes] = useAtom(notesAtom)

    const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

    const handleNotesSelect = (index: number) => async() => {     
        setSelectedNoteIndex(index)

        if(onSelect) {
            onSelect()
        }
    }

    return {
        notes, 
        setNotes,
        selectedNoteIndex,
        handleNotesSelect
    }
}