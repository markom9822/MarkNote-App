import React, { useRef, useEffect, useState } from 'react'

import { Compartment, EditorState, Extension } from '@codemirror/state'
import { EditorView, keymap, Decoration, DecorationSet, MatchDecorator, ViewPlugin, ViewUpdate, WidgetType} from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view'
import { markdown, markdownLanguage} from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { useMarkdownEditor } from "@renderer/hooks/useMarkdownEditor"
import { HighlightStyle, syntaxHighlighting, bracketMatching, syntaxTree } from '@codemirror/language';
import { Tag, tags, styleTags } from '@lezer/highlight';
import { MarkdownConfig, MarkdownExtension } from '@lezer/markdown';
import { RangeSetBuilder, StateField } from "@codemirror/state";
import {CompletionContext, autocompletion} from "@codemirror/autocomplete"
import { history, historyKeymap } from '@codemirror/commands'

import { basicDark } from '@renderer/utils/themes/DarkTheme'
import { getEmojiFromText, getEmojiList } from '@renderer/store/emojisDatabase'

const emojiList = getEmojiList()

// emoji autocomplete
const tagOptions = emojiList.map(emojiItem => ({
  label: ":" + emojiItem.name + ":",
  displayLabel: emojiItem.emoji + emojiItem.name,
}))

function completeEmoji(context: CompletionContext) {
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)

  let textBefore = context.state.sliceDoc(nodeBefore.from, context.pos)
  let tagBefore = /:\w*$/.exec(textBefore)
  if (!tagBefore && !context.explicit) return null

  return {
    from: tagBefore ? nodeBefore.from + tagBefore.index : context.pos,
    options: tagOptions,
    validFor: /^(:\w*)?$/
  }
}

const emojiAutoCompletion = markdownLanguage.data.of({
  autocomplete: completeEmoji,
});

const codeBlockMarker = Decoration.line({ class: "cm-codeblock" });

const CodeBlockField = StateField.define<DecorationSet>({
    create(state) {
      const builder = new RangeSetBuilder<Decoration>();
      syntaxTree(state).iterate({
        enter(node) {
          if (node.type.is("FencedCode")) {
            const firstLine = state.doc.lineAt(node.from).number;
            const lastLine = state.doc.lineAt(node.to).number;
            for (let i = firstLine; i <= lastLine; i++) {
              builder.add(
                state.doc.line(i).from,
                state.doc.line(i).from,
                codeBlockMarker
              );
            }
          }
        },
      });
      return builder.finish();
    },
    update(decorations, tr) {
      const builder = new RangeSetBuilder<Decoration>();
      decorations = decorations.map(tr.changes);
      syntaxTree(tr.state).iterate({
        enter(node) {
          if (node.type.is("FencedCode")) {
            const firstLine = tr.state.doc.lineAt(node.from).number;
            const lastLine = tr.state.doc.lineAt(node.to).number;
            for (let i = firstLine; i <= lastLine; i++) {
              builder.add(
                tr.state.doc.line(i).from,
                tr.state.doc.line(i).from,
                codeBlockMarker
              );
            }
          }
        },
      });
      return builder.finish();
    },
    provide(field) {
      return EditorView.decorations.from(field);
    },
  });
  
  export default CodeBlockField;

  const handleGetEmojiFromText = (text: string) => {
    const emojiText = getEmojiFromText(text)
    if(emojiText == null) return ""
    return emojiText

  }

  class PlaceholderWidget extends WidgetType {
    constructor(readonly text: string) { super() }
  
    toDOM() {
      let wrap = document.createElement("span")
      wrap.setAttribute("aria-hidden", "true")
      wrap.className = "cm-test-text"
      wrap.innerText = handleGetEmojiFromText(this.text);
      return wrap
    }
  
    ignoreEvent() { return false }
  }

  const placeholderMatcher = new MatchDecorator({
    regexp: /\:(\w+)\:/g,
    decoration: match => Decoration.replace({
      widget: new PlaceholderWidget(match[1]),
    })
  })

  const placeholders = ViewPlugin.fromClass(class {
    placeholders: DecorationSet
    constructor(view: EditorView) {
      this.placeholders = placeholderMatcher.createDeco(view)
    }
    update(update: ViewUpdate) {
      this.placeholders = placeholderMatcher.updateDeco(update, this.placeholders)
    }
  }, {
    decorations: instance => instance.placeholders,
    provide: plugin => EditorView.atomicRanges.of(view => {
      return view.plugin(plugin)?.placeholders || Decoration.none
    })
  })


export const transparentTheme = EditorView.theme({
    '&': {
        backgroundColor: "#27272A",
        height: '100%',
        //font:"'JetBrains Mono', monospace",
    },
    '.cm-content': {
        fontSize: '15px',
    },
    ".cm-line.cm-codeblock": {
        backgroundColor: "#18181b",
        color: "#fff",
    },
    ".cm-line.cm-activeLine.cm-codeblock": {
        backgroundColor: "#4a4848",
        color: "#fff",
    },
    '.cm-tooltip': {
      backgroundColor: "#292828",
  },
    
})

const customTags = {
    headingMark: Tag.define(),
  };
  
const MarkStylingExtension: MarkdownConfig = {
    props: [
      styleTags({
        HeadingMark: customTags.headingMark,
      }),
    ],
  };
  
  const highlightStyle = HighlightStyle.define([
    {
        tag: tags.heading1,
        fontSize: '2.1em',
        fontWeight: 'bold',
    },
    {
        tag: tags.heading2,
        fontSize: '1.8em',
        fontWeight: 'bold',
    },
    {
        tag: tags.heading3,
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    {
        tag: tags.heading4,
        fontSize: '1.2em',
        fontWeight: 'bold',
    },
    {
        tag: tags.quote,
    },
    {
        tag: tags.monospace,
        color: '#b6b8ba',
        background: '#18181b',
        borderRadius: '3px',
        padding: '1px'
    },


  ]);


type EditorProps = {
    setView: (view: EditorView | null) => void;
    setDoc: (doc: string | null) => void;
    onChange: (hasChanged: boolean | null) => void;
    onDocChange?: (state: EditorState) => void;
    onPastedLink: (pastedText: string) => void;
    intitialCode: string;
    editable: boolean;
    children?: never;
};

export const CodeMirrorEditor : React.FunctionComponent<EditorProps> = ({
    setView,
    setDoc,
    onChange,
    onDocChange,
    onPastedLink,
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

    const eventHandlers = EditorView.domEventHandlers({
      paste(event, view) {
        var pastedText = event.clipboardData?.getData('Text');

        // check if link
        var regex = /https?:\/\/[^\s]+/g;
        if(pastedText !== undefined)
        if(pastedText.match(regex))
        {
          onPastedLink(pastedText)
          event.preventDefault()
        } 
      },
    })

  useEffect(() => {

    if (!containerRef.current) return

    const startState = EditorState.create({
    doc: doc,
    extensions: [
        [keymap.of(defaultKeymap), [keymap.of(historyKeymap)]],
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        bracketMatching(),
        history(),
        markdown({
            base: markdownLanguage,
            codeLanguages: languages,
            addKeymap: true,
            extensions: [MarkStylingExtension]
        }),
        syntaxHighlighting(
            highlightStyle
        ),
        placeholders,
        emojiAutoCompletion,
        autocompletion({
          closeOnBlur: false,
        }),
        CodeBlockField,
        transparentTheme,
        basicDark,
        eventHandlers,
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