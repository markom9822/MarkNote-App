import { $isGenericHTMLNode } from "./GenericHTMLNode.js";
const LexicalGenericHTMLVisitor = {
  testLexicalNode: $isGenericHTMLNode,
  visitLexicalNode({ actions, lexicalNode }) {
    actions.addAndStepInto("mdxJsxTextElement", {
      name: lexicalNode.getTag(),
      type: lexicalNode.getNodeType(),
      attributes: lexicalNode.getAttributes()
    });
  },
  priority: -100
};
export {
  LexicalGenericHTMLVisitor
};
