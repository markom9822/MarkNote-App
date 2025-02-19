import { NoteInfo, NoteContent, SettingOptionInfo } from "@shared/models";
import { atom } from "jotai";
import {unwrap} from 'jotai/utils'

const loadNotes = async () => {
    const allNotes = await window.context.getNotes()

    // sort notes by most recently edited
    return allNotes.sort((a,b) => b.lastEditTime - a.lastEditTime)
}


const allNotesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const allNotesAtom = unwrap(allNotesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const filteredNotesAtom = atom<NoteInfo[] | null>(await loadNotes())

const selectedNoteAtomAsync = atom(async (get) => {
    const filteredNotes = get(filteredNotesAtom)
    const allNotes = get(allNotesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex == null || !allNotes) return null

    const selectedNote = allNotes[selectedNoteIndex]

    const noteContent = await window.context.readNote(selectedNote.title)

    return {
        ...selectedNote,
        content: noteContent
    }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? {
    title: '',
    content: '',
    lastEditTime: Date.now(),
    status: '',
})

export const renameNoteAtom = atom(null, async (get, set, newTitle: string) => {
    const notes = get(allNotesAtom)
    const selectedNote = get(selectedNoteAtom)
    
    if(!selectedNote || !notes) return
    
    // save on disk
    await window.context.renameNote(selectedNote.title, newTitle)

    set(
        allNotesAtom,
        notes.map((note) => {
            // this is the note that we want to update
            if(note.title == selectedNote.title) {
                return {
                    ...note,
                    title: newTitle
                }
            }
            return note
        })
    )

    set(
        filteredNotesAtom,
        notes.map((note) => {
            // this is the note that we want to update
            if(note.title == selectedNote.title) {
                return {
                    ...note,
                    title: newTitle
                }
            }
            return note
        })
    )

})

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
    const notes = get(allNotesAtom)
    const selectedNote = get(selectedNoteAtom)

    if(!selectedNote || !notes) return

    // save on disk
    await window.context.writeNote(selectedNote.title, newContent)

    // update the saved note's last edit time
    set(
        allNotesAtom,
        notes.map((note) => {
            // this is the note that we want to update
            if(note.title == selectedNote.title) {
                return {
                    ...note,
                    lastEditTime: Date.now()
                }
            }
            return note
        })
    )

    set(
        filteredNotesAtom,
        notes.map((note) => {
            // this is the note that we want to update
            if(note.title == selectedNote.title) {
                return {
                    ...note,
                    lastEditTime: Date.now()
                }
            }
            return note
        })
    )
})

export const setNoteStatusAtom = atom(null, async (get, set, newStatus: string) => {
    const notes = get(allNotesAtom)
    const selectedNote = get(selectedNoteAtom)

    if(!selectedNote || !notes) return

    // save on disk
    await window.context.setNoteStatus(selectedNote.title, newStatus)

    // update the saved note's last edit time
    set(
        allNotesAtom,
        notes.map((note) => {
            // this is the note that we want to update
            if(note.title == selectedNote.title) {
                return {
                    ...note,
                    status: newStatus
                }
            }
            return note
        })
    )

    set(
        filteredNotesAtom,
        notes.map((note) => {
            // this is the note that we want to update
            if(note.title == selectedNote.title) {
                return {
                    ...note,
                    status: newStatus
                }
            }
            return note
        })
    )
})

export const createEmptyNoteAtom = atom(null, async (get,set) =>  {
    const notes = get(allNotesAtom)

    if(!notes) return

    const title = await window.context.createNote()

    if(!title) return

    const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now(),
        status: 'Active'
    }

    set(allNotesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

    set(filteredNotesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

    set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get,set) => {
    const notes = get(allNotesAtom)
    const selectedNote = get(selectedNoteAtom)

    if(!selectedNote || !notes) return

    const isDeleted = await window.context.deleteNote(selectedNote.title)

    if(!isDeleted) return

    // filter out deleted note
    set(
        allNotesAtom, 
        notes.filter((note) => note.title !== selectedNote.title)
    )

    set(
        filteredNotesAtom, 
        notes.filter((note) => note.title !== selectedNote.title)
    )

    // de selecting any note
    set(selectedNoteIndexAtom, null)
})


export const closeAppAtom = atom(null, async () => {
    
    await window.context.closeApp()
})

export const minimiseAppAtom = atom(null, async () => {
    
    await window.context.minimiseApp()
})