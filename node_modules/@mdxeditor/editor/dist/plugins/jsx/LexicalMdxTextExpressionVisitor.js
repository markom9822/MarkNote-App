import { $isLexicalMdxTextExpressionNode } from "./LexicalMdxTextExpressionNode.js";
const LexicalMdxTextExpressionVisitor = {
  testLexicalNode: $isLexicalMdxTextExpressionNode,
  visitLexicalNode({ actions, mdastParent, lexicalNode }) {
    const mdastNode = {
      type: "mdxTextExpression",
      value: lexicalNode.getValue()
    };
    actions.appendToParent(mdastParent, mdastNode);
  }
};
export {
  LexicalMdxTextExpressionVisitor
};
