import { $isLineBreakNode } from "lexical";
const LexicalLinebreakVisitor = {
  testLexicalNode: $isLineBreakNode,
  visitLexicalNode: ({ mdastParent, actions }) => {
    actions.appendToParent(mdastParent, { type: "text", value: "\n" });
  }
};
export {
  LexicalLinebreakVisitor
};
