import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { lineNumbers, EditorView } from "@codemirror/view";
import { basicLight } from "cm6-theme-basic-light";
import { basicSetup } from "codemirror";
import React__default from "react";
import { cmExtensions$ } from "./index.js";
import { markdown$, readOnly$, markdownSourceEditorValue$, onBlur$ } from "../core/index.js";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
const COMMON_STATE_CONFIG_EXTENSIONS = [
  basicSetup,
  basicLight,
  markdown(),
  lineNumbers(),
  EditorView.lineWrapping
];
const SourceEditor = () => {
  const [markdown2, readOnly, cmExtensions] = useCellValues(markdown$, readOnly$, cmExtensions$);
  const updateMarkdown = usePublisher(markdownSourceEditorValue$);
  const triggerOnBlur = usePublisher(onBlur$);
  const editorViewRef = React__default.useRef(null);
  const ref = React__default.useCallback(
    (el) => {
      var _a;
      if (el !== null) {
        const extensions = [
          // custom extensions should come first so that you can override the default extensions
          ...cmExtensions,
          ...COMMON_STATE_CONFIG_EXTENSIONS,
          EditorView.updateListener.of(({ state }) => {
            updateMarkdown(state.doc.toString());
          }),
          EditorView.focusChangeEffect.of((_, focused) => {
            if (!focused) {
              triggerOnBlur(new FocusEvent("blur"));
            }
            return null;
          })
        ];
        if (readOnly) {
          extensions.push(EditorState.readOnly.of(true));
        }
        el.innerHTML = "";
        editorViewRef.current = new EditorView({
          parent: el,
          state: EditorState.create({ doc: markdown2, extensions })
        });
      } else {
        (_a = editorViewRef.current) == null ? void 0 : _a.destroy();
        editorViewRef.current = null;
      }
    },
    [markdown2, readOnly, updateMarkdown, cmExtensions, triggerOnBlur]
  );
  return /* @__PURE__ */ React__default.createElement("div", { ref, className: "cm-sourceView mdxeditor-source-editor" });
};
export {
  COMMON_STATE_CONFIG_EXTENSIONS,
  SourceEditor
};
