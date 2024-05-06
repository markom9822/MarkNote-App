import { appDirectoryName, fileEncoding, welcomeNoteFilename } from "@shared/constants"
import { NoteInfo } from "@shared/models"
import { GetNotes, ReadNote, WriteNote, CreateNote, DeleteNote, RenameNote } from "@shared/types"
import { app, dialog } from "electron"
import { readdir, stat, readFile, remove, rename } from "fs-extra"
import { ensureDir, writeFile } from "fs-extra"
import { homedir } from "os"
import path from 'path'
import { isEmpty } from 'lodash'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

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

        const content = await readFile(welcomeNoteFile, {encoding: fileEncoding})

        // create welcome note
        await writeFile(`${rootDir}\\${welcomeNoteFilename}`, content, {encoding: fileEncoding})

        notes.push(welcomeNoteFilename)
    }

    return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDir()}/${filename}`)

    return {
        title: filename.replace(/\.md$/, ''), 
        lastEditTime: fileStats.mtimeMs
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
    return true
}

