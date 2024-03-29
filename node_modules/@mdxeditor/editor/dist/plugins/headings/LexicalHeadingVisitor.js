import { $isHeadingNode } from "@lexical/rich-text";
const LexicalHeadingVisitor = {
  testLexicalNode: $isHeadingNode,
  visitLexicalNode: ({ lexicalNode, actions }) => {
    const depth = parseInt(lexicalNode.getTag()[1], 10);
    actions.addAndStepInto("heading", { depth });
  }
};
export {
  LexicalHeadingVisitor
};
