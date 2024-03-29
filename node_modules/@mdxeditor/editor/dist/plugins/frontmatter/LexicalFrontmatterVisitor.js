import { $isFrontmatterNode } from "./FrontmatterNode.js";
const LexicalFrontmatterVisitor = {
  testLexicalNode: $isFrontmatterNode,
  visitLexicalNode: ({ actions, lexicalNode }) => {
    actions.addAndStepInto("yaml", { value: lexicalNode.getYaml() });
  }
};
export {
  LexicalFrontmatterVisitor
};
