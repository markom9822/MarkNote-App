import { $createLexicalMdxTextExpressionNode } from "./LexicalMdxTextExpressionNode.js";
const MdastMdxTextExpressionVisitor = {
  testNode: "mdxTextExpression",
  visitNode({ lexicalParent, mdastNode }) {
    lexicalParent.append($createLexicalMdxTextExpressionNode(mdastNode.value));
  },
  priority: -200
};
export {
  MdastMdxTextExpressionVisitor
};
