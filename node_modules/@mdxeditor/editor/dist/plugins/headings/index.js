import { $createHeadingNode, HeadingNode } from "@lexical/rich-text";
import { Cell } from "@mdxeditor/gurx";
import { KEY_DOWN_COMMAND, $createParagraphNode, COMMAND_PRIORITY_LOW } from "lexical";
import { realmPlugin } from "../../RealmWithPlugins.js";
import { controlOrMeta } from "../../utils/detectMac.js";
import { createRootEditorSubscription$, convertSelectionToNode$, addActivePlugin$, addImportVisitor$, addLexicalNode$, addExportVisitor$ } from "../core/index.js";
import { LexicalHeadingVisitor } from "./LexicalHeadingVisitor.js";
import { MdastHeadingVisitor } from "./MdastHeadingVisitor.js";
const FORMATTING_KEYS = [48, 49, 50, 51, 52, 53, 54];
const ALL_HEADING_LEVELS = [1, 2, 3, 4, 5, 6];
const CODE_TO_HEADING_LEVEL_MAP = {
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6
};
const allowedHeadingLevels$ = Cell(ALL_HEADING_LEVELS, (r) => {
  r.pub(createRootEditorSubscription$, (theRootEditor) => {
    return theRootEditor.registerCommand(
      KEY_DOWN_COMMAND,
      (event) => {
        const { keyCode, ctrlKey, metaKey, altKey } = event;
        if (FORMATTING_KEYS.includes(keyCode) && controlOrMeta(metaKey, ctrlKey) && altKey) {
          event.preventDefault();
          theRootEditor.update(() => {
            if (keyCode === 48) {
              r.pub(convertSelectionToNode$, () => $createParagraphNode());
            } else {
              const allowedHeadingLevels = r.getValue(allowedHeadingLevels$);
              const requestedHeadingLevel = CODE_TO_HEADING_LEVEL_MAP[keyCode];
              if (!allowedHeadingLevels.includes(requestedHeadingLevel)) {
                r.pub(convertSelectionToNode$, () => $createHeadingNode(`h${requestedHeadingLevel}`));
              }
            }
          });
          return true;
        }
        return false;
      },
      COMMAND_PRIORITY_LOW
    );
  });
});
const headingsPlugin = realmPlugin({
  init(realm) {
    realm.pubIn({
      [addActivePlugin$]: "headings",
      [addImportVisitor$]: MdastHeadingVisitor,
      [addLexicalNode$]: HeadingNode,
      [addExportVisitor$]: LexicalHeadingVisitor
    });
  },
  update(realm, params) {
    realm.pub(allowedHeadingLevels$, (params == null ? void 0 : params.allowedHeadingLevels) ?? ALL_HEADING_LEVELS);
  }
});
export {
  ALL_HEADING_LEVELS,
  allowedHeadingLevels$,
  headingsPlugin
};
