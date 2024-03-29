import { $isDirectiveNode } from "./DirectiveNode.js";
const DirectiveVisitor = {
  testLexicalNode: $isDirectiveNode,
  visitLexicalNode({ actions, mdastParent, lexicalNode }) {
    actions.appendToParent(mdastParent, lexicalNode.getMdastNode());
  }
};
export {
  DirectiveVisitor
};
