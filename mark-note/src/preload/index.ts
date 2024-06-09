import { minimiseApp } from "@/lib"
import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote, RenameNote, SetNoteStatus, CloseApp, MinimiseApp } from "@shared/types"
import { contextBridge, ipcRenderer } from "electron"

if(!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    renameNote: (...args: Parameters<RenameNote>) => ipcRenderer.invoke('renameNote', ...args),
    setNoteStatus: (...args: Parameters<SetNoteStatus>) => ipcRenderer.invoke('setNoteStatus', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
    closeApp: (...args: Parameters<CloseApp>) => ipcRenderer.send('close'),
    minimiseApp: (...args: Parameters<MinimiseApp>) => ipcRenderer.send('minimise'),
  })
  
} catch (error) {
  console.error(error)
}
