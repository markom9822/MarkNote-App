import { $isTableNode } from "./TableNode.js";
const LexicalTableVisitor = {
  testLexicalNode: $isTableNode,
  visitLexicalNode({ actions, mdastParent, lexicalNode }) {
    actions.appendToParent(mdastParent, lexicalNode.getMdastNode());
  }
};
export {
  LexicalTableVisitor
};
