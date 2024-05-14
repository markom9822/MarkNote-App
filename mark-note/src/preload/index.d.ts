import { CreateNote, DeleteNote, GetNotes, ReadNote, RenameNote, SetNoteStatus, WriteNote } from "@shared/types"

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      renameNote: RenameNote
      setNoteStatus: SetNoteStatus
      createNote: CreateNote
      deleteNote: DeleteNote
    }
  }
}
