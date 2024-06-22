import { CloseApp, CreateNote, DeleteNote, GetNotes, GetSettingPrefValue, MinimiseApp, ReadNote, RenameNote, SetNoteStatus, SetSettingPref, WriteNote } from "@shared/types"

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
      closeApp: CloseApp
      minimiseApp: MinimiseApp
      setSettingPref: SetSettingPref
      getSettingPrefValue: GetSettingPrefValue
    }
  }
}
