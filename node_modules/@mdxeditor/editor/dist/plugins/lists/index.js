import { currentSelection$, activeEditor$, rootEditor$, addActivePlugin$, addMdastExtension$, addSyntaxExtension$, addImportVisitor$, addLexicalNode$, addExportVisitor$, addToMarkdownExtension$, addComposerChild$, addNestedEditorChild$ } from "../core/index.js";
import { MdastListVisitor } from "./MdastListVisitor.js";
import { MdastListItemVisitor } from "./MdastListItemVisitor.js";
import { LexicalListVisitor } from "./LexicalListVisitor.js";
import { LexicalListItemVisitor } from "./LexicalListItemVisitor.js";
import { $isListNode, ListNode, ListItemNode, $getListDepth, $isListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, INSERT_CHECK_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $isRootOrShadowRoot, INDENT_CONTENT_COMMAND, COMMAND_PRIORITY_CRITICAL, $getSelection, $isRangeSelection, $isElementNode } from "lexical";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin.js";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin.js";
import { ListPlugin } from "@lexical/react/LexicalListPlugin.js";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import { gfmTaskListItem } from "micromark-extension-gfm-task-list-item";
import { gfmTaskListItemFromMarkdown, gfmTaskListItemToMarkdown } from "mdast-util-gfm-task-list-item";
import { Cell, withLatestFrom, Signal } from "@mdxeditor/gurx";
import { realmPlugin } from "../../RealmWithPlugins.js";
const ListTypeCommandMap = /* @__PURE__ */ new Map([
  ["number", INSERT_ORDERED_LIST_COMMAND],
  ["bullet", INSERT_UNORDERED_LIST_COMMAND],
  ["check", INSERT_CHECK_LIST_COMMAND],
  ["", REMOVE_LIST_COMMAND]
]);
const currentListType$ = Cell("", (r) => {
  r.sub(r.pipe(currentSelection$, withLatestFrom(activeEditor$)), ([selection, theEditor]) => {
    if (!selection || !theEditor) {
      return;
    }
    const anchorNode = selection.anchor.getNode();
    let element = anchorNode.getKey() === "root" ? anchorNode : $findMatchingParent(anchorNode, (e) => {
      const parent = e.getParent();
      return parent !== null && $isRootOrShadowRoot(parent);
    });
    if (element === null) {
      element = anchorNode.getTopLevelElementOrThrow();
    }
    const elementKey = element.getKey();
    const elementDOM = theEditor.getElementByKey(elementKey);
    if (elementDOM !== null) {
      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType(anchorNode, ListNode);
        const type = parentList ? parentList.getListType() : element.getListType();
        r.pub(currentListType$, type);
      } else {
        r.pub(currentListType$, "");
      }
    }
  });
});
const applyListType$ = Signal((r) => {
  r.sub(r.pipe(applyListType$, withLatestFrom(activeEditor$)), ([listType, theEditor]) => {
    theEditor == null ? void 0 : theEditor.dispatchCommand(ListTypeCommandMap.get(listType), void 0);
  });
});
const listsPlugin = realmPlugin({
  init(realm) {
    var _a;
    (_a = realm.getValue(rootEditor$)) == null ? void 0 : _a.registerCommand(INDENT_CONTENT_COMMAND, () => !isIndentPermitted(7), COMMAND_PRIORITY_CRITICAL);
    realm.pubIn({
      [addActivePlugin$]: "lists",
      [addMdastExtension$]: gfmTaskListItemFromMarkdown(),
      [addSyntaxExtension$]: gfmTaskListItem(),
      [addImportVisitor$]: [MdastListVisitor, MdastListItemVisitor],
      [addLexicalNode$]: [ListItemNode, ListNode],
      [addExportVisitor$]: [LexicalListVisitor, LexicalListItemVisitor],
      [addToMarkdownExtension$]: gfmTaskListItemToMarkdown(),
      [addComposerChild$]: [TabIndentationPlugin, ListPlugin, CheckListPlugin],
      [addNestedEditorChild$]: [TabIndentationPlugin, ListPlugin, CheckListPlugin]
    });
  }
});
function getElementNodesInSelection(selection) {
  const nodesInSelection = selection.getNodes();
  if (nodesInSelection.length === 0) {
    return /* @__PURE__ */ new Set([selection.anchor.getNode().getParentOrThrow(), selection.focus.getNode().getParentOrThrow()]);
  }
  return new Set(nodesInSelection.map((n) => $isElementNode(n) ? n : n.getParentOrThrow()));
}
function isIndentPermitted(maxDepth) {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) {
    return false;
  }
  const elementNodesInSelection = getElementNodesInSelection(selection);
  let totalDepth = 0;
  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth);
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent();
      if ((parent == null ? void 0 : parent.getChildren().length) === 1) {
        const grandParentListItem = parent == null ? void 0 : parent.getParent();
        if ($isListItemNode(grandParentListItem) && grandParentListItem.getChildren().length === 1) {
          return false;
        }
      }
      if (!$isListNode(parent)) {
        throw new Error("ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.");
      }
      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth);
    }
  }
  return totalDepth <= maxDepth;
}
export {
  applyListType$,
  currentListType$,
  listsPlugin
};
