import { $isListNode } from "@lexical/list";
const LexicalListVisitor = {
  testLexicalNode: $isListNode,
  visitLexicalNode: ({ lexicalNode, actions }) => {
    actions.addAndStepInto("list", {
      ordered: lexicalNode.getListType() === "number",
      spread: false
    });
  }
};
export {
  LexicalListVisitor
};
