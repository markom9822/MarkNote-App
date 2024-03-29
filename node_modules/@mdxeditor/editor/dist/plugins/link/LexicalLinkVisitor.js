import { $isLinkNode } from "@lexical/link";
const LexicalLinkVisitor = {
  testLexicalNode: $isLinkNode,
  visitLexicalNode: ({ lexicalNode, actions }) => {
    actions.addAndStepInto("link", { url: lexicalNode.getURL(), title: lexicalNode.getTitle() });
  }
};
export {
  LexicalLinkVisitor
};
