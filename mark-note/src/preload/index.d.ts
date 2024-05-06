import { CreateNote, DeleteNote, GetNotes, ReadNote, RenameNote, WriteNote } from "@shared/types"

declare global {
  interface Window {
    context: {
      locale: string
      getNotes: GetNotes
      readNote: ReadNote
      writeNote: WriteNote
      renameNote: RenameNote
      createNote: CreateNote
      deleteNote: DeleteNote
    }
  }
}
