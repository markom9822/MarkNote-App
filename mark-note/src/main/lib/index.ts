import { appDirectoryName, fileEncoding, welcomeNoteFilename } from "@shared/constants"
import { NoteInfo, SettingPrefsInfo } from "@shared/models"
import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote, RenameNote, SetNoteStatus, CloseApp, MinimiseApp, SetSettingPref, GetAllPrefs } from "@shared/types"
import { app, dialog } from "electron"
import { readdir, stat, readFile, remove, rename } from "fs-extra"
import { ensureDir, writeFile} from "fs-extra"
import { homedir } from "os"
import path from 'path'
import { isEmpty } from 'lodash'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

export const settingsPrefsDefaults = [{
    
    section: 'Themes',
    title: 'UI Theme',
    prefValue: 'dark',
  },
  {

    section: 'Themes',
    title: 'Editor Theme',
    prefValue: 'dark',
  },
  {
    section: 'Themes',
    title: 'Preview Theme',
    prefValue: 'dark',
  },
  {
    section: 'Editor',
    title: 'Line Numbers Visible',
    prefValue: 'true',
  },
  {
    section: 'Editor',
    title: 'Toolbar Visible',
    prefValue: 'true',
  },
  {
    section: 'Editor',
    title: 'Highlight Active Line',
    prefValue: 'true',
  },
  {
    section: 'Editor',
    title: 'Line Wrapping',
    prefValue: 'true',
  },
  {
    section: 'Editor',
    title: 'Bracket Matching',
    prefValue: 'true',
  },
  {
    section: 'Editor',
    title: 'Tab Size',
    prefValue: '3',
  },
  {
    section: 'Editor',
    title: 'Editor Font Size',
    prefValue: '15px',
  },
  {
    section: 'Preview',
    title: 'Preview Font Size',
    prefValue: '16px',
  },
];


export const getRootDir = () => {
    return `${homedir()}\\${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir()

    await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    })

    const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

    if(isEmpty(notes)) {
        console.info('No notes found, creating welcome note')

        const json = [{title: welcomeNoteFilename.replace(/\.md$/, ''), status: "Active"}];

        await writeFile(`${rootDir}\\NotesInfoJSON.json`, JSON.stringify(json), {encoding: fileEncoding})
            .then(  () => { console.log('Append Success'); })
            .catch(err => { console.log("Append Failed: " + err);});

        await writeFile(`${rootDir}\\SettingsPrefsJSON.json`, JSON.stringify(settingsPrefsDefaults), {encoding: fileEncoding})
            .then(  () => { console.log('Append Success'); })
            .catch(err => { console.log("Append Failed: " + err);});

        const content = await readFile(welcomeNoteFile, {encoding: fileEncoding})

        // create welcome note
        await writeFile(`${rootDir}\\${welcomeNoteFilename}`, content, {encoding: fileEncoding})

        notes.push(welcomeNoteFilename)
    }

    return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
    const rootDir = getRootDir()

    const fileStats = await stat(`${rootDir}/${filename}`)

    var noteStatus = '';

    await readFile(`${rootDir}\\NotesInfoJSON.json`, { encoding: fileEncoding}) 
        .then(jsonData => { 
                let json = JSON.parse(jsonData);
                json.map((noteJSON) => {
                    // this is the note that we want to update
                    if(noteJSON.title == filename.replace(/\.md$/, '')) {
                        noteStatus = noteJSON.status
                    } 
                })
        }
    )

    return {
        title: filename.replace(/\.md$/, ''), 
        lastEditTime: fileStats.mtimeMs,
        status: noteStatus
    }
}

export const readNote: ReadNote = async (filename) => {
    const rootDir = getRootDir()

    return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding})
}

export const writeNote: WriteNote = async (filename, content) => {
    const rootDir = getRootDir()

    console.info(`Writing note ${filename}`)
    return writeFile(`${rootDir}/${filename}.md`, content, {encoding: fileEncoding}) 
}

export const renameNote: RenameNote = async (filename, newTitle) => {
    const rootDir = getRootDir()

    console.info(`Renaming note ${filename}`)
    return rename(`${rootDir}/${filename}.md`, `${rootDir}/${newTitle}.md`)
}

export const setNoteStatus: SetNoteStatus = async (filename, newStatus) => {
    const rootDir = getRootDir()

    console.info(`Setting status of note ${filename}`)
    readFile(`${rootDir}\\NotesInfoJSON.json`, { encoding: fileEncoding}) 
        .then(jsonData => { 
                let json = JSON.parse(jsonData);
                json.map((noteJSON, index) => {
                    // this is the note that we want to update
                    if(noteJSON.title == filename.replace(/\.md$/, '')) {
                        json[index].status = newStatus
                    } 
                })

                writeFile(`${rootDir}\\NotesInfoJSON.json`, JSON.stringify(json), {encoding: fileEncoding})
                        .then(  () => { console.log('Append Success'); })
                        .catch(err => { console.log("Append Failed: " + err);});
        })
        .catch(err => { console.log("Read Error: " +err);});
}

export const setSettingPref: SetSettingPref = async (prefTitle, newPref) => {
    const rootDir = getRootDir()

    readFile(`${rootDir}\\SettingsPrefsJSON.json`, { encoding: fileEncoding}) 
        .then(jsonData => { 
                let json = JSON.parse(jsonData);
                json.map((prefJSON, index) => {
                    // this is the note that we want to update
                    if(prefJSON.title == prefTitle) {
                        json[index].prefValue = newPref
                    } 
                })

                writeFile(`${rootDir}\\SettingsPrefsJSON.json`, JSON.stringify(json), {encoding: fileEncoding})
                        .then(  () => { console.log('Append Success'); })
                        .catch(err => { console.log("Append Failed: " + err);});
        })
        .catch(err => { console.log("Read Error: " +err);});
}

export const getAllPrefs: GetAllPrefs = async () => {
    var titlesArray = new Array();

    settingsPrefsDefaults.map((pref) => {

        titlesArray.push(pref.title)
    })

    return Promise.all(titlesArray.map(getSettingPrefValue))

}

export const getSettingPrefValue = async (prefTitle: string): Promise<SettingPrefsInfo> => {
    const rootDir = getRootDir()

    var readPref = '';
    var readTitle = '';

    await readFile(`${rootDir}\\SettingsPrefsJSON.json`, { encoding: fileEncoding}) 
        .then(jsonData => { 
                let json = JSON.parse(jsonData);
                json.map((prefJSON) => {
                    // this is the note that we want to update
                    if(prefJSON.title == prefTitle) {
                        readPref = prefJSON.prefValue
                        readTitle = prefJSON.title
                    } 
                })
        }
    )

    return {
        title: readTitle,
        prefValue: readPref
    }
}


export const createNote: CreateNote = async () => {
    const rootDir = getRootDir()

    await ensureDir(rootDir)

    console.info(`DOCS Directory: ${app.getPath('documents')}`)

    const {filePath, canceled} = await dialog.showSaveDialog({
        title: 'New Note',
        defaultPath: `${rootDir}\\Untitled.md`,
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation'],
        showsTagField: false,
        filters: [{name: 'Markdown', extensions: ['md']}]
    })

    if(canceled || !filePath){
        console.info('Note creation canceled')
        return false
    }

    const {name: filename, dir: parentDir} = path.parse(filePath)

    if (parentDir !== rootDir) {
        await dialog.showMessageBox({
            type: 'error',
            title: 'Creation failed',
            message: `All notes must be saved under ${rootDir}.
            Avoid using other directories!`

        })

        return false
    }

    console.info(`Creating note: ${filePath}`)

    await writeFile(filePath, '')
    
    // store note data in json
    readFile(`${rootDir}\\NotesInfoJSON.json`, { encoding: fileEncoding}) 
        .then(jsonData => { 
                let json = JSON.parse(jsonData);
                json.push({title: filename, status: "Active"});

                writeFile(`${rootDir}\\NotesInfoJSON.json`, JSON.stringify(json), {encoding: fileEncoding})
                        .then(  () => { console.log('Append Success'); })
                        .catch(err => { console.log("Append Failed: " + err);});
        })
        .catch(err => { console.log("Read Error: " +err);});

    return filename
}

export const deleteNote: DeleteNote = async (filename) => {
    const rootDir = getRootDir()

    const {response} = await dialog.showMessageBox({
        type: 'warning',
        title: 'Delete note',
        message: `Are you sure you want to delete ${filename}`,
        buttons: ['Delete', 'Cancel'],
        defaultId: 1,
        cancelId: 1
    })

    if(response === 1)
    {
        console.info('Note deletion canceled')
        return false
    }

    console.info(`Deleting note: ${filename}`)
    await remove(`${rootDir}\\${filename}.md`)

    // remove note data in json
    readFile(`${rootDir}\\NotesInfoJSON.json`, { encoding: fileEncoding}) 
        .then(jsonData => { 
                let json = JSON.parse(jsonData);
                //json.push({title: filename, status: "Active"});
                const newJSON = json.filter((item) => item.title !== filename);

                writeFile(`${rootDir}\\NotesInfoJSON.json`, JSON.stringify(newJSON), {encoding: fileEncoding})
                        .then(  () => { console.log('Append Success'); })
                        .catch(err => { console.log("Append Failed: " + err);});
        })
        .catch(err => { console.log("Read Error: " +err);});


    return true
}


export const closeApp: CloseApp = async () => {
}

export const minimiseApp: MinimiseApp = async () => {
}

