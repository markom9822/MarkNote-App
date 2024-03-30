import React, { useRef, useEffect, useState, useCallback, Component } from 'react'
import { EditorView } from "@codemirror/view";
import { CodeMirrorEditor } from './UseCodeMirror'
import { useMarkdownEditor } from "@renderer/hooks/useMarkdownEditor"
import { useSetAtom } from "jotai"
import { saveNoteAtom } from "@renderer/store"


export type MarkdownEditorProps = {
    onChange: (doc: string) => void;
    editable: boolean
}

export const MarkdownEditor = ({
    onChange,
    editable
}: MarkdownEditorProps) => {

    const {selectedNote, saveEditorView} = useMarkdownEditor()

    const [view, setView] = useState<EditorView | null>(null);
    const [doc, setDoc] = useState<string | null>('');
    const [hasChanged, setChange] = useState<boolean | null>(false);
    const saveNote = useSetAtom(saveNoteAtom)

    // handle saving text
    const handleSavingText = useCallback(async () => {
        try {
            console.info("Trying to save")
            if(doc !== null)
            await saveNote(doc)
            
        } catch (error) {
            alert('Something went wrong, could not save')
        }

    }, [doc])

    // typing timer
    useEffect(() => {

        if (!selectedNote) return

            const timeoutID = setTimeout(async () => {
                await handleSavingText()
            }, 1000)

            return () => clearTimeout(timeoutID)
    }, [doc])

    useEffect(() => {
        if(view !== null)
        {
            saveEditorView(view)
        }
        
    }, [view])

    const handleChange = useCallback(
        state => onChange(state.doc.toString()),
        [onChange]
      )

    if(!selectedNote) return null

    const editor = <CodeMirrorEditor setView={setView} setDoc={setDoc} onChange={setChange} onDocChange={handleChange} intitialCode={selectedNote.content} editable={editable}/>
    
    return {
        editor,
        view
    }
}