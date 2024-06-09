import { closeApp, createNote, deleteNote, getNotes, minimiseApp, readNote, renameNote, setNoteStatus, writeNote } from '@/lib'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { CloseApp, CreateNote, DeleteNote, GetNotes, MinimiseApp, ReadNote, RenameNote, SetNoteStatus, WriteNote } from '@shared/types'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/MarkNoteLogoPixel.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    show: false,
    icon: icon,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    title: 'MarkNote',
    titleBarOverlay: true,
    backgroundMaterial: 'acrylic',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('minimise', () =>{
    mainWindow.minimize()
  })
 
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  //ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('close', () => {
    app.quit()
  })

  // useful trick here
  ipcMain.handle('getNotes', (_, ...args: Parameters<GetNotes>) => getNotes(...args))
  ipcMain.handle('readNote', (_, ...args: Parameters<ReadNote>) => readNote(...args))
  ipcMain.handle('writeNote', (_, ...args: Parameters<WriteNote>) => writeNote(...args))
  ipcMain.handle('renameNote', (_, ...args: Parameters<RenameNote>) => renameNote(...args))
  ipcMain.handle('setNoteStatus', (_, ...args: Parameters<SetNoteStatus>) => setNoteStatus(...args))
  ipcMain.handle('createNote', (_, ...args: Parameters<CreateNote>) => createNote(...args))
  ipcMain.handle('deleteNote', (_, ...args: Parameters<DeleteNote>) => deleteNote(...args))
  ipcMain.handle('closeApp', (_, ...args: Parameters<CloseApp>) => () => closeApp(...args) )
  ipcMain.handle('minimiseApp', (_, ...args: Parameters<MinimiseApp>) => () => minimiseApp(...args) )


  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
