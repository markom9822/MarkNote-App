import { $getSelection, $getRoot } from "lexical";
import { $isAtNodeEnd } from "@lexical/selection";
import { tap } from "./fp.js";
import { exportMarkdownFromLexical } from "../exportMarkdownFromLexical.js";
function fromWithinEditorRead(editor, fn) {
  let result = null;
  editor.getEditorState().read(() => {
    result = fn();
  });
  return result;
}
function getSelectedNode(selection) {
  try {
    const anchor = selection.anchor;
    const focus = selection.focus;
    const anchorNode = selection.anchor.getNode();
    const focusNode = selection.focus.getNode();
    if (anchorNode === focusNode) {
      return anchorNode;
    }
    const isBackward = selection.isBackward();
    if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode;
    } else {
      return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
    }
  } catch (e) {
    return null;
  }
}
function getSelectionRectangle(editor) {
  const selection = $getSelection();
  const nativeSelection = window.getSelection();
  const activeElement = document.activeElement;
  const rootElement = editor.getRootElement();
  if (selection !== null && nativeSelection !== null && rootElement !== null && rootElement.contains(nativeSelection.anchorNode) && editor.isEditable()) {
    const domRange = nativeSelection.getRangeAt(0);
    let rect;
    if (nativeSelection.isCollapsed) {
      let node = nativeSelection.anchorNode;
      if ((node == null ? void 0 : node.nodeType) == 3) {
        node = node.parentNode;
      }
      rect = node.getBoundingClientRect();
      rect.width = 0;
    } else {
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }
    }
    return {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    };
  } else if (!activeElement || activeElement.className !== "link-input") {
    return null;
  }
  return null;
}
function getStateAsMarkdown(editor, exportParams) {
  return tap({ markdown: "" }, (result) => {
    editor.getEditorState().read(() => {
      result.markdown = exportMarkdownFromLexical({ root: $getRoot(), ...exportParams });
    });
  }).markdown;
}
export {
  fromWithinEditorRead,
  getSelectedNode,
  getSelectionRectangle,
  getStateAsMarkdown
};
