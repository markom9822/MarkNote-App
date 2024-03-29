import { $isParagraphNode } from "lexical";
const LexicalParagraphVisitor = {
  testLexicalNode: $isParagraphNode,
  visitLexicalNode: ({ actions }) => {
    actions.addAndStepInto("paragraph");
  }
};
export {
  LexicalParagraphVisitor
};
