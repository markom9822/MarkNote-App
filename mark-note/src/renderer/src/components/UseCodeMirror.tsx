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
import { basicLight } from '@renderer/utils/themes/LightTheme'
import { solarizedDark } from '@renderer/utils/themes/SolarizedDark'


import { getEmojiFromText, getEmojiList } from '@renderer/store/emojisDatabase'
import { InsertTextAroundInEditor, InsertTextAtStartInEditor } from './MarkdownEditorToolBar'
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'


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


type EditorProps = {
    setView: (view: EditorView | null) => void;
    setDoc: (doc: string | null) => void;
    onChange: (hasChanged: boolean | null) => void;
    onDocChange?: (state: EditorState) => void;
    onPastedLink: (pastedText: string) => void;
    intitialCode: string;
    editorTheme: string;
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
        const editorView = view;

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

    const toolbarKeymap = [
      { key: 'Ctrl-b', run: (target: EditorView) => {InsertTextAroundInEditor("****", target, true) 
        return true;
        }
      },
      { key: 'Ctrl-i', run: (target: EditorView) => {InsertTextAroundInEditor("**", target, true)
          return true;
        }
      },
      { key: 'Ctrl-U', run: (target: EditorView) => {InsertTextAroundInEditor("____", target, true)
          return true;
        }
      },
      { key: 'Ctrl-S', run: (target: EditorView) => {InsertTextAroundInEditor("~~~~", target, true)
          return true;
        }
      },
      { key: 'Ctrl-1', run: (target: EditorView) => {InsertTextAtStartInEditor("# ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-2', run: (target: EditorView) => {InsertTextAtStartInEditor("## ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-3', run: (target: EditorView) => {InsertTextAtStartInEditor("### ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-4', run: (target: EditorView) => {InsertTextAtStartInEditor("#### ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-5', run: (target: EditorView) => {InsertTextAtStartInEditor("- ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-6', run: (target: EditorView) => {InsertTextAtStartInEditor("1. ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-7', run: (target: EditorView) => {InsertTextAtStartInEditor("- [ ] ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-B', run: (target: EditorView) => {InsertTextAtStartInEditor("> ", target, false)
          return true;
        }
      },
      { key: 'Ctrl-C', run: (target: EditorView) => {InsertTextAroundInEditor("```" + "\n" + "\n" +"```", target, true)
          return true;
        }
      },
    ]

  const codeMirrorExtensions = [
    [keymap.of(toolbarKeymap), keymap.of(defaultKeymap), [keymap.of(historyKeymap)], ],
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
    placeholders,
    emojiAutoCompletion,
    autocompletion({
      closeOnBlur: false,
    }),
    CodeBlockField,
    basicDark,
    //basicLight,
    //solarizedDark,
    eventHandlers,
    EditorView.lineWrapping,
    EditorView.updateListener.of(update => {
        if (update.changes) {
           setDoc(update.state.doc.toString())
           onDocChange && onDocChange(update.state)
        }
        const hasChanged = update.startState !== update.state;
        onChange(hasChanged) 
    }),
    isEditable.of(EditorView.editable.of(editable))
]
  
  const currentLineNum = getSettingPrefValueFromTitle('Line Numbers Visible');


  useEffect(() => {

    if (!containerRef.current) return

    const startState = EditorState.create({
    doc: doc,
    extensions: codeMirrorExtensions,
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