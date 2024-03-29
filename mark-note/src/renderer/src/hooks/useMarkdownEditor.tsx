import React, { useRef, useState} from 'react'
import { MDXEditorMethods } from "@mdxeditor/editor"
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store"
import { NoteContent } from "@shared/models"
import { useAtomValue, useSetAtom } from "jotai"
import {throttle} from "lodash"
import { autoSavingTime } from "@shared/constants"
import { EditorView } from "@codemirror/view";


export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const saveNote = useSetAtom(saveNoteAtom)
    const editorRef = useRef<MDXEditorMethods>(null)
    const [editorView, setEditorView] = useState<EditorView | null>(null);

    const handleAutoSaving = throttle(
       async (content: NoteContent) => {
        if(!selectedNote) return

        console.info('Auto saving:', selectedNote.title)

        await saveNote(content)
    }, 
    autoSavingTime, 
    {
        leading: false,
        trailing: true
    }
    )

    const handleBlur = async () => {
        if(!selectedNote) return

        handleAutoSaving.cancel()

        const content = editorRef.current?.getMarkdown()

        if(content != null)
        {
            await saveNote(content)
        }
    }

    function saveEditorView(view)
    {
        console.info("SAVING EDITOR VIEW")
        setEditorView(view)
    }

    return {
        editorRef,
        selectedNote,
        handleAutoSaving,
        handleBlur,
        saveEditorView,
        editorView
    }

}