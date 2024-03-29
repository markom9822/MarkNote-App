import { CodeBlockVisitor } from "./CodeBlockVisitor.js";
import { MdastCodeVisitor } from "./MdastCodeVisitor.js";
import { insertDecoratorNode$, Appender, codeBlockEditorDescriptors$, addActivePlugin$, addImportVisitor$, addLexicalNode$, addExportVisitor$ } from "../core/index.js";
import { $createCodeBlockNode, CodeBlockNode } from "./CodeBlockNode.js";
import { $isCodeBlockNode, useCodeBlockEditorContext } from "./CodeBlockNode.js";
import { Cell, Signal, withLatestFrom, map } from "@mdxeditor/gurx";
import { realmPlugin } from "../../RealmWithPlugins.js";
const defaultCodeBlockLanguage$ = Cell("");
const insertCodeBlock$ = Signal((r) => {
  r.link(
    r.pipe(
      insertCodeBlock$,
      withLatestFrom(defaultCodeBlockLanguage$),
      map(
        ([payload, defaultCodeBlockLanguage]) => () => $createCodeBlockNode({ language: defaultCodeBlockLanguage, ...payload })
      )
    ),
    insertDecoratorNode$
  );
});
const appendCodeBlockEditorDescriptor$ = Appender(codeBlockEditorDescriptors$);
const codeBlockPlugin = realmPlugin({
  update(realm, params) {
    realm.pub(defaultCodeBlockLanguage$, (params == null ? void 0 : params.defaultCodeBlockLanguage) || "");
  },
  init(realm, params) {
    realm.pubIn({
      [addActivePlugin$]: "codeblock",
      [codeBlockEditorDescriptors$]: (params == null ? void 0 : params.codeBlockEditorDescriptors) || [],
      [addImportVisitor$]: MdastCodeVisitor,
      [addLexicalNode$]: CodeBlockNode,
      [addExportVisitor$]: CodeBlockVisitor
    });
  }
});
export {
  $createCodeBlockNode,
  $isCodeBlockNode,
  CodeBlockNode,
  appendCodeBlockEditorDescriptor$,
  codeBlockPlugin,
  defaultCodeBlockLanguage$,
  insertCodeBlock$,
  useCodeBlockEditorContext
};
