import { $isRootNode } from "lexical";
const LexicalRootVisitor = {
  testLexicalNode: $isRootNode,
  visitLexicalNode: ({ actions }) => {
    actions.addAndStepInto("root");
  }
};
export {
  LexicalRootVisitor
};
