import { $isHorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode.js";
const LexicalThematicBreakVisitor = {
  testLexicalNode: $isHorizontalRuleNode,
  visitLexicalNode({ actions }) {
    actions.addAndStepInto("thematicBreak");
  }
};
export {
  LexicalThematicBreakVisitor
};
