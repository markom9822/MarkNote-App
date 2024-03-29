import { TOGGLE_LINK_COMMAND, $isLinkNode } from "@lexical/link";
import { KEY_ESCAPE_COMMAND, COMMAND_PRIORITY_LOW, KEY_MODIFIER_COMMAND, $getSelection, $isRangeSelection, COMMAND_PRIORITY_HIGH, $createTextNode, $insertNodes } from "lexical";
import { IS_APPLE } from "../../utils/detectMac.js";
import { getSelectionRectangle, getSelectedNode } from "../../utils/lexicalHelpers.js";
import { createActiveEditorSubscription$, activeEditor$, currentSelection$, addComposerChild$ } from "../core/index.js";
import { LinkDialog } from "./LinkDialog.js";
import { Signal, Cell, withLatestFrom, map, Action, filter } from "@mdxeditor/gurx";
import { realmPlugin } from "../../RealmWithPlugins.js";
function getLinkNodeInSelection(selection) {
  if (!selection) {
    return null;
  }
  const node = getSelectedNode(selection);
  if (node === null) {
    return null;
  }
  const parent = node.getParent();
  if ($isLinkNode(parent)) {
    return parent;
  } else if ($isLinkNode(node)) {
    return node;
  }
  return null;
}
const onWindowChange$ = Signal();
const linkDialogState$ = Cell({ type: "inactive" }, (r) => {
  r.pub(createActiveEditorSubscription$, (editor) => {
    return editor.registerCommand(
      KEY_ESCAPE_COMMAND,
      () => {
        const state = r.getValue(linkDialogState$);
        if (state.type === "preview") {
          r.pub(linkDialogState$, { type: "inactive" });
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  });
  r.pub(createActiveEditorSubscription$, (editor) => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (event) => {
        if (event.key === "k" && (IS_APPLE ? event.metaKey : event.ctrlKey)) {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            r.pub(openLinkEditDialog$);
            event.stopPropagation();
            event.preventDefault();
            return true;
          } else {
            return false;
          }
        }
        return false;
      },
      COMMAND_PRIORITY_HIGH
    );
  });
  r.link(
    r.pipe(
      switchFromPreviewToLinkEdit$,
      withLatestFrom(linkDialogState$),
      map(([, state]) => {
        if (state.type === "preview") {
          return {
            type: "edit",
            initialUrl: state.url,
            url: state.url,
            title: state.title,
            linkNodeKey: state.linkNodeKey,
            rectangle: state.rectangle
          };
        } else {
          throw new Error("Cannot switch to edit mode when not in preview mode");
        }
      })
    ),
    linkDialogState$
  );
  r.sub(r.pipe(updateLink$, withLatestFrom(activeEditor$, linkDialogState$, currentSelection$)), ([payload, editor, state, selection]) => {
    const url = payload.url.trim();
    const title = payload.title.trim();
    if (url.trim() !== "") {
      if (selection == null ? void 0 : selection.isCollapsed()) {
        const linkContent = title || url;
        editor == null ? void 0 : editor.update(
          () => {
            if (!getLinkNodeInSelection(selection)) {
              const node = $createTextNode(linkContent);
              $insertNodes([node]);
              node.select();
            }
          },
          { discrete: true }
        );
      }
      editor == null ? void 0 : editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, title });
      r.pub(linkDialogState$, {
        type: "preview",
        linkNodeKey: state.linkNodeKey,
        rectangle: state.rectangle,
        title,
        url
      });
    } else {
      if (state.type === "edit" && state.initialUrl !== "") {
        editor == null ? void 0 : editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      }
      r.pub(linkDialogState$, {
        type: "inactive"
      });
    }
  });
  r.link(
    r.pipe(
      cancelLinkEdit$,
      withLatestFrom(linkDialogState$, activeEditor$),
      map(([, state, editor]) => {
        if (state.type === "edit") {
          editor == null ? void 0 : editor.focus();
          if (state.initialUrl === "") {
            return {
              type: "inactive"
            };
          } else {
            return {
              type: "preview",
              url: state.initialUrl,
              linkNodeKey: state.linkNodeKey,
              rectangle: state.rectangle
            };
          }
        } else {
          throw new Error("Cannot cancel edit when not in edit mode");
        }
      })
    ),
    linkDialogState$
  );
  r.link(
    r.pipe(
      r.combine(currentSelection$, onWindowChange$),
      withLatestFrom(activeEditor$, linkDialogState$),
      map(([[selection], activeEditor]) => {
        if ($isRangeSelection(selection) && activeEditor) {
          const node = getLinkNodeInSelection(selection);
          if (node) {
            return {
              type: "preview",
              url: node.getURL(),
              linkNodeKey: node.getKey(),
              title: node.getTitle(),
              rectangle: getSelectionRectangle(activeEditor)
            };
          } else {
            return { type: "inactive" };
          }
        } else {
          return { type: "inactive" };
        }
      })
    ),
    linkDialogState$
  );
});
const updateLink$ = Signal();
const cancelLinkEdit$ = Action();
const applyLinkChanges$ = Action();
const switchFromPreviewToLinkEdit$ = Action();
const removeLink$ = Action((r) => {
  r.sub(r.pipe(removeLink$, withLatestFrom(activeEditor$)), ([, editor]) => {
    editor == null ? void 0 : editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  });
});
const openLinkEditDialog$ = Action((r) => {
  r.sub(
    r.pipe(
      openLinkEditDialog$,
      withLatestFrom(currentSelection$, activeEditor$),
      filter(([, selection]) => $isRangeSelection(selection))
    ),
    ([, selection, editor]) => {
      editor == null ? void 0 : editor.focus(() => {
        editor == null ? void 0 : editor.getEditorState().read(() => {
          const node = getLinkNodeInSelection(selection);
          const rectangle = getSelectionRectangle(editor);
          if (node) {
            r.pub(linkDialogState$, {
              type: "edit",
              initialUrl: node.getURL(),
              initialTitle: node.getTitle() || "",
              url: node.getURL(),
              title: node.getTitle() || "",
              linkNodeKey: node.getKey(),
              rectangle
            });
          } else {
            r.pub(linkDialogState$, {
              type: "edit",
              initialUrl: "",
              initialTitle: "",
              title: "",
              url: "",
              linkNodeKey: "",
              rectangle
            });
          }
        });
      });
    }
  );
});
const linkAutocompleteSuggestions$ = Cell([]);
const onClickLinkCallback$ = Cell(null);
const linkDialogPlugin = realmPlugin({
  init(r, params) {
    r.pub(addComposerChild$, (params == null ? void 0 : params.LinkDialog) || LinkDialog);
    r.pub(onClickLinkCallback$, (params == null ? void 0 : params.onClickLinkCallback) ?? null);
  },
  update(r, params = {}) {
    r.pub(linkAutocompleteSuggestions$, params.linkAutocompleteSuggestions || []);
  }
});
export {
  applyLinkChanges$,
  cancelLinkEdit$,
  linkAutocompleteSuggestions$,
  linkDialogPlugin,
  linkDialogState$,
  onClickLinkCallback$,
  onWindowChange$,
  openLinkEditDialog$,
  removeLink$,
  switchFromPreviewToLinkEdit$,
  updateLink$
};
