import React, { useRef, useEffect, useState, useCallback, Component } from 'react'
import { EditorView } from "@codemirror/view";
import { CodeMirrorEditor } from './UseCodeMirror'
import { useMarkdownEditor } from "@renderer/hooks/useMarkdownEditor"
import { useSetAtom, useAtomValue } from "jotai"
import { saveNoteAtom, selectedNoteAtom, allNotesAtom } from "@renderer/store"
import { useNotesList } from '@renderer/hooks/useNotesList';
import { NoteInfo } from '@shared/models';

export type MarkdownEditorProps = {
    onChange: (doc: string) => void;
    onPastedLink: (pastedText: string) => void;
    editable: boolean,
}

export const MarkdownEditor = ({
    onChange,
    onPastedLink,
    editable,
}: MarkdownEditorProps) => {

    const {saveEditorView} = useMarkdownEditor()
    const selectedNote = useAtomValue(selectedNoteAtom)
    const notes = useAtomValue(allNotesAtom)

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

    const editor = <CodeMirrorEditor setView={setView} setDoc={setDoc} onChange={setChange} onDocChange={handleChange} onPastedLink={onPastedLink}
     intitialCode={selectedNote.content} editable={editable}/>
    
    return {
        editor,
        view
    }
}

