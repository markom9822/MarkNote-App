import { NoteContent, NoteInfo } from "./models";

export type GetNotes = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type RenameNote = (title: NoteInfo['title'], newTitle: string) => Promise<void>
export type SetNoteStatus = (title: NoteInfo['title'], newStatus: string) => Promise<void>
export type SetSettingPref= (prefTitle: string, newPref: string) => Promise<void>
export type GetSettingPrefValue= (prefTitle: string) => Promise<string>

export type CreateNote = () => Promise<NoteInfo['title'] | false>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
export type CloseApp = () => void;
export type MinimiseApp = () => void;