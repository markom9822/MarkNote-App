import { $isCodeBlockNode } from "./CodeBlockNode.js";
const CodeBlockVisitor = {
  testLexicalNode: $isCodeBlockNode,
  visitLexicalNode: ({ lexicalNode, actions }) => {
    actions.addAndStepInto("code", {
      value: lexicalNode.getCode(),
      lang: lexicalNode.getLanguage(),
      meta: lexicalNode.getMeta()
    });
  }
};
export {
  CodeBlockVisitor
};
