import { $isLexicalJsxNode } from "./LexicalJsxNode.js";
import { isMdastJsxNode } from "./index.js";
const LexicalJsxVisitor = {
  testLexicalNode: $isLexicalJsxNode,
  visitLexicalNode({ actions, mdastParent, lexicalNode }) {
    function traverseNestedJsxNodes(node) {
      if ("children" in node && node.children instanceof Array) {
        node.children.forEach((child) => {
          if (isMdastJsxNode(child)) {
            actions.registerReferredComponent(child.name);
          }
          traverseNestedJsxNodes(child);
        });
      }
    }
    const mdastNode = lexicalNode.getMdastNode();
    actions.registerReferredComponent(mdastNode.name);
    traverseNestedJsxNodes(mdastNode);
    actions.appendToParent(mdastParent, mdastNode);
  },
  priority: -200
};
export {
  LexicalJsxVisitor
};
