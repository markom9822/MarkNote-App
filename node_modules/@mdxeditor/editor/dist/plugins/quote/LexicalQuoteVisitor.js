import { $isQuoteNode } from "@lexical/rich-text";
const LexicalQuoteVisitor = {
  testLexicalNode: $isQuoteNode,
  visitLexicalNode: ({ lexicalNode, mdastParent, actions }) => {
    const paragraph = { type: "paragraph", children: [] };
    actions.appendToParent(mdastParent, { type: "blockquote", children: [paragraph] });
    actions.visitChildren(lexicalNode, paragraph);
  }
};
export {
  LexicalQuoteVisitor
};
