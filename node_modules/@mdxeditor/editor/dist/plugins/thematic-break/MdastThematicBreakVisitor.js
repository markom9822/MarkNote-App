import { $createHorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode.js";
const MdastThematicBreakVisitor = {
  testNode: "thematicBreak",
  visitNode({ actions }) {
    actions.addAndStepInto($createHorizontalRuleNode());
  }
};
export {
  MdastThematicBreakVisitor
};
