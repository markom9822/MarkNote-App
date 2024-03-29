import { $createLexicalJsxNode } from "./LexicalJsxNode.js";
const MdastMdxJsxElementVisitor = {
  testNode: (node, { jsxComponentDescriptors }) => {
    if (node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement") {
      const descriptor = jsxComponentDescriptors.find((descriptor2) => descriptor2.name === node.name);
      return descriptor !== void 0;
    }
    return false;
  },
  visitNode({ lexicalParent, mdastNode }) {
    lexicalParent.append($createLexicalJsxNode(mdastNode));
  },
  priority: -200
};
export {
  MdastMdxJsxElementVisitor
};
