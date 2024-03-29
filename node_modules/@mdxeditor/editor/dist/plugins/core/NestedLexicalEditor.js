import { $addUpdateTag, $getNodeByKey, createEditor, $getRoot, BLUR_COMMAND, COMMAND_PRIORITY_EDITOR, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_HIGH, KEY_BACKSPACE_COMMAND, COMMAND_PRIORITY_CRITICAL } from "lexical";
import React__default from "react";
import { NESTED_EDITOR_UPDATED_COMMAND, rootEditor$, importVisitors$, exportVisitors$, usedLexicalNodes$, jsxComponentDescriptors$, directiveDescriptors$, codeBlockEditorDescriptors$, jsxIsAvailable$, nestedEditorChildren$, editorInFocus$ } from "./index.js";
import { ContentEditable } from "@lexical/react/LexicalContentEditable.js";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary.js";
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer.js";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin.js";
import { lexicalTheme } from "../../styles/lexicalTheme.js";
import { exportLexicalTreeToMdast } from "../../exportMarkdownFromLexical.js";
import { importMdastTreeToLexical } from "../../importMarkdownToLexical.js";
import styles from "../../styles/ui.module.css.js";
import { SharedHistoryPlugin } from "./SharedHistoryPlugin.js";
import { mergeRegister } from "@lexical/utils";
import { isPartOftheEditorUI } from "../../utils/isPartOftheEditorUI.js";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
const NestedEditorsContext = React__default.createContext(void 0);
function useNestedEditorContext() {
  const context = React__default.useContext(NestedEditorsContext);
  if (!context) {
    throw new Error("useNestedEditor must be used within a NestedEditorsProvider");
  }
  return context;
}
function useMdastNodeUpdater() {
  const { parentEditor, mdastNode, lexicalNode } = useNestedEditorContext();
  return function updateMdastNode(node) {
    parentEditor.update(
      () => {
        $addUpdateTag("history-push");
        const currentNode = $getNodeByKey(lexicalNode.getKey());
        if (currentNode) {
          currentNode.setMdastNode({ ...mdastNode, ...node });
        }
      },
      { discrete: true }
    );
    parentEditor.dispatchCommand(NESTED_EDITOR_UPDATED_COMMAND, void 0);
  };
}
function useLexicalNodeRemove() {
  const { parentEditor, lexicalNode } = useNestedEditorContext();
  return () => {
    parentEditor.update(() => {
      const node = $getNodeByKey(lexicalNode.getKey());
      node.selectNext();
      node.remove();
    });
  };
}
const NestedLexicalEditor = function(props) {
  const { getContent, getUpdatedMdastNode, contentEditableProps, block = false } = props;
  const { mdastNode, lexicalNode, focusEmitter } = useNestedEditorContext();
  const updateMdastNode = useMdastNodeUpdater();
  const removeNode = useLexicalNodeRemove();
  const content = getContent(mdastNode);
  const [
    rootEditor,
    importVisitors,
    exportVisitors,
    usedLexicalNodes,
    jsxComponentDescriptors,
    directiveDescriptors,
    codeBlockEditorDescriptors,
    jsxIsAvailable,
    nestedEditorChildren
  ] = useCellValues(
    rootEditor$,
    importVisitors$,
    exportVisitors$,
    usedLexicalNodes$,
    jsxComponentDescriptors$,
    directiveDescriptors$,
    codeBlockEditorDescriptors$,
    jsxIsAvailable$,
    nestedEditorChildren$
  );
  const setEditorInFocus = usePublisher(editorInFocus$);
  const [editor] = React__default.useState(() => {
    const editor2 = createEditor({
      nodes: usedLexicalNodes,
      theme: lexicalTheme
    });
    return editor2;
  });
  React__default.useEffect(() => {
    focusEmitter == null ? void 0 : focusEmitter.subscribe(() => {
      editor.focus();
    });
  }, [editor, focusEmitter]);
  React__default.useEffect(() => {
    editor.update(() => {
      $getRoot().clear();
      let theContent = content;
      if (block) {
        if (theContent.length === 0) {
          theContent = [{ type: "paragraph", children: [] }];
        }
      } else {
        theContent = [{ type: "paragraph", children: content }];
      }
      importMdastTreeToLexical({
        root: $getRoot(),
        mdastRoot: {
          type: "root",
          children: theContent
        },
        visitors: importVisitors,
        directiveDescriptors,
        codeBlockEditorDescriptors,
        jsxComponentDescriptors
      });
    });
  }, [editor, block, importVisitors]);
  React__default.useEffect(() => {
    function updateParentNode() {
      editor.getEditorState().read(() => {
        const mdast = exportLexicalTreeToMdast({
          root: $getRoot(),
          visitors: exportVisitors,
          jsxComponentDescriptors,
          jsxIsAvailable,
          addImportStatements: false
        });
        const content2 = block ? mdast.children : mdast.children[0].children;
        updateMdastNode(getUpdatedMdastNode(structuredClone(mdastNode), content2));
      });
    }
    return mergeRegister(
      editor.registerCommand(
        BLUR_COMMAND,
        (payload) => {
          const relatedTarget = payload.relatedTarget;
          if (isPartOftheEditorUI(relatedTarget, rootEditor.getRootElement())) {
            return false;
          }
          updateParentNode();
          setEditorInFocus(null);
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      // triggered by codemirror
      editor.registerCommand(
        NESTED_EDITOR_UPDATED_COMMAND,
        () => {
          updateParentNode();
          return true;
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          setEditorInFocus({ editorType: "lexical", rootNode: lexicalNode });
          return false;
        },
        COMMAND_PRIORITY_HIGH
      ),
      editor.registerCommand(
        KEY_BACKSPACE_COMMAND,
        (_, editor2) => {
          const editorElement = editor2.getRootElement();
          if ((editorElement == null ? void 0 : editorElement.innerText) === "\n") {
            removeNode();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [
    block,
    editor,
    exportVisitors,
    getUpdatedMdastNode,
    jsxComponentDescriptors,
    jsxIsAvailable,
    lexicalNode,
    mdastNode,
    removeNode,
    setEditorInFocus,
    updateMdastNode,
    rootEditor
  ]);
  return /* @__PURE__ */ React__default.createElement(LexicalNestedComposer, { initialEditor: editor }, /* @__PURE__ */ React__default.createElement(
    RichTextPlugin,
    {
      contentEditable: /* @__PURE__ */ React__default.createElement(ContentEditable, { ...contentEditableProps, className: styles.nestedEditor }),
      placeholder: null,
      ErrorBoundary: LexicalErrorBoundary
    }
  ), /* @__PURE__ */ React__default.createElement(SharedHistoryPlugin, null), nestedEditorChildren.map((Child, index) => /* @__PURE__ */ React__default.createElement(Child, { key: index })));
};
export {
  NestedEditorsContext,
  NestedLexicalEditor,
  useLexicalNodeRemove,
  useMdastNodeUpdater,
  useNestedEditorContext
};
