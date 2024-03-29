import React, { useRef, useEffect, useState } from 'react'

import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view'
import { oneDark } from '@codemirror/theme-one-dark'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { useMarkdownEditor } from "@renderer/hooks/useMarkdownEditor"


export const transparentTheme = EditorView.theme({
    '&': {
        backgroundColor: 'transparent !important',
        height: '100%'
    }
})

type EditorProps = {
    setView: (view: EditorView | null) => void;
    setDoc: (doc: string | null) => void;
    onChange: (hasChanged: boolean | null) => void;
    onDocChange?: (state: EditorState) => void
    intitialCode: string;
    editable: boolean;
    children?: never;
};

export const CodeMirrorEditor : React.FunctionComponent<EditorProps> = ({
    setView,
    setDoc,
    onChange,
    onDocChange,
    intitialCode: doc,
    editable,
}) => {
    
    const containerRef = useRef<HTMLDivElement | null>(null);
    const {selectedNote} = useMarkdownEditor()

    let isEditable = new Compartment;

    function setIsEditable(view, canEdit) {
        view.dispatch({
            effects: isEditable.reconfigure(EditorView.editable.of(canEdit))
          })
    }

  useEffect(() => {

    if (!containerRef.current) return

    const startState = EditorState.create({
    doc: doc,
    extensions: [
        keymap.of(defaultKeymap),
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        markdown({
            base: markdownLanguage,
            codeLanguages: languages,
          }),
        oneDark,
        transparentTheme,
        EditorView.updateListener.of(update => {
            if (update.changes) {
               setDoc(update.state.doc.toString())
               onDocChange && onDocChange(update.state)
            }
            const hasChanged = update.startState !== update.state;
            onChange(hasChanged) 
        }),
        isEditable.of(EditorView.editable.of(editable))
    ],
    
    })

    const view = new EditorView({ 
        state: startState, 
        parent: containerRef.current,
        extensions: []
    })
    setView(view)
    view.contentDOM.blur()    

    setIsEditable(view, editable)

    return () => {
    view.destroy()
    setView(null)
    }
}
, [containerRef, selectedNote?.title, editable])


return <div ref={containerRef}></div>
}