import { realmPlugin } from "../../RealmWithPlugins.js";
import { INSERT_HORIZONTAL_RULE_COMMAND, HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode.js";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin.js";
import { Action, withLatestFrom } from "@mdxeditor/gurx";
import { activeEditor$, addImportVisitor$, addLexicalNode$, addExportVisitor$, addComposerChild$ } from "../core/index.js";
import { LexicalThematicBreakVisitor } from "./LexicalThematicBreakVisitor.js";
import { MdastThematicBreakVisitor } from "./MdastThematicBreakVisitor.js";
const insertThematicBreak$ = Action((r) => {
  r.sub(r.pipe(insertThematicBreak$, withLatestFrom(activeEditor$)), ([, theEditor]) => {
    theEditor == null ? void 0 : theEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, void 0);
  });
});
const thematicBreakPlugin = realmPlugin({
  init(realm) {
    realm.pubIn({
      [addImportVisitor$]: MdastThematicBreakVisitor,
      [addLexicalNode$]: HorizontalRuleNode,
      [addExportVisitor$]: LexicalThematicBreakVisitor,
      [addComposerChild$]: HorizontalRulePlugin
    });
  }
});
export {
  insertThematicBreak$,
  thematicBreakPlugin
};
