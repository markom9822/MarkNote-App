import { notesAtom, selectedNoteIndexAtom, selectedNoteAtom } from "@/store"
import { useAtom, useAtomValue } from "jotai"


export const useNotesList = ({onSelect}: {onSelect?: () => void}) => {
    const selectedNote = useAtomValue(selectedNoteAtom)

    const notes = useAtomValue(notesAtom)

    const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

    const handleNotesSelect = (index: number) => async() => {        
        setSelectedNoteIndex(index)

        if(onSelect) {
            onSelect()
        }
    }

    return {
        notes, 
        selectedNoteIndex,
        handleNotesSelect
    }
}