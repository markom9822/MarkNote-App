import { trimTextContentFromAnchor } from "@lexical/selection";
import { $restoreEditorState } from "@lexical/utils";
import { RootNode, $getSelection, $isRangeSelection } from "lexical";
import { realmPlugin } from "../../RealmWithPlugins.js";
import { createRootEditorSubscription$ } from "../core/index.js";
const maxLengthPlugin = realmPlugin({
  init: (realm, maxLength = Infinity) => {
    realm.pub(createRootEditorSubscription$, (editor) => {
      let lastRestoredEditorState = null;
      return editor.registerNodeTransform(RootNode, (rootNode) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
          return;
        }
        const prevEditorState = editor.getEditorState();
        const prevTextContentSize = prevEditorState.read(() => rootNode.getTextContentSize());
        const textContentSize = rootNode.getTextContentSize();
        if (prevTextContentSize !== textContentSize) {
          const delCount = textContentSize - maxLength;
          const anchor = selection.anchor;
          if (delCount > 0) {
            if (prevTextContentSize === maxLength && lastRestoredEditorState !== prevEditorState) {
              lastRestoredEditorState = prevEditorState;
              $restoreEditorState(editor, prevEditorState);
            } else {
              trimTextContentFromAnchor(editor, anchor, delCount);
            }
          }
        }
      });
    });
  }
});
export {
  maxLengthPlugin
};
