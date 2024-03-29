import { realmPlugin } from "../../RealmWithPlugins.js";
import { Cell, Signal, map } from "@mdxeditor/gurx";
import { insertCodeBlock$, appendCodeBlockEditorDescriptor$ } from "../codeblock/index.js";
import { CodeMirrorEditor } from "./CodeMirrorEditor.js";
const codeBlockLanguages$ = Cell({
  js: "JavaScript",
  ts: "TypeScript",
  tsx: "TypeScript (React)",
  jsx: "JavaScript (React)",
  css: "CSS"
});
const insertCodeMirror$ = Signal((r) => {
  r.link(
    r.pipe(
      insertCodeMirror$,
      map(({ language, code }) => {
        return {
          code,
          language,
          meta: ""
        };
      })
    ),
    insertCodeBlock$
  );
});
const codeMirrorTheme$ = Cell("auto");
const codeMirrorPlugin = realmPlugin({
  update(r, params) {
    r.pubIn({
      [codeBlockLanguages$]: params == null ? void 0 : params.codeBlockLanguages,
      [codeMirrorTheme$]: (params == null ? void 0 : params.theme) || "auto"
    });
  },
  init(r, params) {
    r.pubIn({
      [codeBlockLanguages$]: params == null ? void 0 : params.codeBlockLanguages,
      [codeMirrorTheme$]: (params == null ? void 0 : params.theme) || "auto",
      [appendCodeBlockEditorDescriptor$]: buildCodeBlockDescriptor((params == null ? void 0 : params.codeBlockLanguages) || {})
    });
  }
});
function buildCodeBlockDescriptor(codeBlockLanguages) {
  return {
    match(language, meta) {
      return Boolean(codeBlockLanguages.hasOwnProperty(language || "")) && !Boolean(meta);
    },
    priority: 1,
    Editor: CodeMirrorEditor
  };
}
export {
  codeBlockLanguages$,
  codeMirrorPlugin,
  codeMirrorTheme$,
  insertCodeMirror$
};
